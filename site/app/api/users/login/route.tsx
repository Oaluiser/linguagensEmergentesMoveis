import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt" 
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request, res: NextResponse) {
    const body = await req.json()

    // em termos de segurança, o recomendado é exibir uma mensagem padrão
    // a fim de evitar de dar "dicas" sobre o processo de login para hackers
    const mensaPadrao = "Login ou senha incorretos"
  
    if (!body.email || !body.senha) {
      // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }
  
    try {
      const cliente = await prisma.user.findUnique({
        where: { email: body.email }
      })
  
      if (cliente == null) {
        // res.status(400).json({ erro: "E-mail inválido" })
        res.status(400).json({ erro: mensaPadrao })
        return
      }
  
      // se o e-mail existe, faz-se a comparação dos hashs
      if (bcrypt.compareSync(body.senha, cliente.password)) {
       Response.json({
            id: cliente.id,
          nome: cliente.name,
          email: cliente.email
        })
      } else {
        // res.status(400).json({ erro: "Senha incorreta" })
  
        res.status(400).json({ erro: mensaPadrao })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  
    return Response.json(user)
}
