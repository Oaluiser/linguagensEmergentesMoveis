import { hashPassword, generateToken } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()

  const hashedPassword = await hashPassword(body.password)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      profile: "Admin",
      email: body.email,
      password: hashedPassword
    }
  })

  const token = generateToken(user.id)

  return Response.json({ mensagem: "Admin criado com sucesso.", token }, { status: 201 })
}

export async function PATCH(request: Request) {
  const body = await request.json()

  const user = await prisma.user.update({
    where: { id: body.id },
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })

  return Response.json(user)
}

export async function DELETE(request: Request) {
  const body = await request.json()

  const product = await prisma.user.delete({
    where: { id: body.id }
  })

  return Response.json(body)
}
