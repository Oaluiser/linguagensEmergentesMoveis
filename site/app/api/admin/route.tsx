import { hashPassword, generateToken } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Name, email, and password are required" }), { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: "Admin"
      }
    })

    const token = await generateToken(user.id)

    return new Response(JSON.stringify({ mensagem: "Admin criado com sucesso.", token }), { status: 201 })
  } catch (error) {
    console.error("Error creating admin:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
