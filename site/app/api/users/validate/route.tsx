import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")
    const token = authHeader!.split(" ")[1]
    const payload = await verifyToken(token)
    const { id } = payload

    if (!id) {
      return NextResponse.json({ error: "Erro ao Validar cliente" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: String(id) } })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error("Error fetching client:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
