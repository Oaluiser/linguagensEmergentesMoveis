import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const count = await prisma.order.count()
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error fetching product count:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
