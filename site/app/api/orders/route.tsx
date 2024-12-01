import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()

  const order = await prisma.order.create({
    data: {
      userId: body.userId,
      products: {
        create: body.products.map((product: any) => ({
          quantity: product.quantity,
          product: { connect: { id: product.productId } }
        }))
      }
    }
  })

  return Response.json(order)
}

export async function DELETE(request: Request) {
  const body = await request.json()

  await prisma.order.delete({ where: { id: body.id } })

  return Response.json(body)
}
