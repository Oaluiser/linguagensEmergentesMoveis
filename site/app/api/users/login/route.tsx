import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const mensaPadrao = "Login ou senha incorretos"

  if (!body.email || !body.password) {
    return NextResponse.json({ erro: mensaPadrao }, { status: 400 })
  }

  try {
    const cliente = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (cliente == null) {
      return NextResponse.json({ erro: mensaPadrao }, { status: 400 })
    }

    if (body.password == cliente.password) {
      return NextResponse.json({
        id: cliente.id,
        name: cliente.name,
        email: cliente.email
      })
    } else {
      return NextResponse.json({ erro: mensaPadrao }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
