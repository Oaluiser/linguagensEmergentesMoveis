import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany()
  return Response.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: parseFloat(body.price),
      image: body.image,
      description: body.description
    }
  })

  return Response.json(product)
}

export async function PATCH(request: Request) {
  const body = await request.json()

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      price: parseFloat(body.price),
      image: body.image,
      description: body.description
    }
  })

  return Response.json(product)
}

export async function DELETE(request: Request) {
  const body = await request.json()

  const product = await prisma.product.delete({
    where: { id: body.id }
  })

  return Response.json(product)
}
