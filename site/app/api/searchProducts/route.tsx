import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const query = body.query

  const products = await prisma.product.findMany({
    where: { OR: [{ name: { contains: query } }, { description: { contains: query } }] }
  })

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" }
  })
}
