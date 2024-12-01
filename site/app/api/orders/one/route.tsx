import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    const token = authHeader!.split(" ")[1]
    const payload = await verifyToken(token)
    const { id } = payload

    const body = await request.json()
    const { productId } = body

    console.log("Creating order for user:", id, "and product:", productId)

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: id } },
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    await prisma.order.delete({ where: { id: body.id } })
    return NextResponse.json(body)
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
