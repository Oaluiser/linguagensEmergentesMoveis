import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader) {
    return NextResponse.json({ mensagem: "Token não fornecido." }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  
  try {
    verifyToken(token)
    return NextResponse.next()
  } catch(error) {
    console.log("Token verification failed:", error)
    return NextResponse.json({ mensagem: "Token inválido." }, { status: 403 })
  }
}

export const config = {
  matcher: ["/api/users/validate"]
}
