import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const product = await prisma.product.findUnique({
      where: { id }
    })
    if (product) {
      return NextResponse.json(product)
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
  } else {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  }
}
