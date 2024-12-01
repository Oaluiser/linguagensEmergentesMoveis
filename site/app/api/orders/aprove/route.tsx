import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "Aprovado" }
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
