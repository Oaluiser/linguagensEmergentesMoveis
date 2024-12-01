import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header missing" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = await verifyToken(token)
    const userId = payload.id as string

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }


    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        products: {
          create: {
            quantity: 1,
            product: { connect: { id: productId } }
          }
        }
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
