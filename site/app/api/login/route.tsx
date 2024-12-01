import { comparePassword, generateToken } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await prisma.user.findUnique({ where: { email: body.email } })

    if (!user) {
      return Response.json({ mensagem: "Usuário não encontrado." }, { status: 404 })
    }

    const isValid = await comparePassword(body.password, user.password)

    if (!isValid) {
      return Response.json({ mensagem: "Senha inválida." }, { status: 401 })
    }

    const token = await generateToken(user.id)

    return Response.json({ mensagem: "Login realizado com sucesso.", token }, { status: 200 })
  } catch {
    return Response.json({ mensagem: "Falha ao fazer login." }, { status: 500 })
  }
}
