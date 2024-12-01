import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get the top 3 most sold products by summing the quantities
    const topProducts = await prisma.orderProduct.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: "desc"
        }
      }
    })

    // Fetch the product details for the top products
    const productIds = topProducts.map((item) => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    })

    // Combine the product details with the sold quantities
    const formattedTopProducts = topProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return {
        id: item.productId,
        name: product?.name,
        sold: item._sum.quantity,
        image: product?.image,
        description: product?.description,
        price: product?.price
      }
    })

    return NextResponse.json(formattedTopProducts)
  } catch (error) {
    console.error("Error fetching top products:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
