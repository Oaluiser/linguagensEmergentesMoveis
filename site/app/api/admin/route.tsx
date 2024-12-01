import { hashPassword, generateToken } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return Response.json({ error: "Name, email, and password are required" }, { status: 400 })
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

    return Response.json({ mensagem: "Admin criado com sucesso.", token }, { status: 201 })
  } catch (error) {
    console.error("Error creating admin:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
