"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Cliente {
  name: string
  profile: string
}

export function Header() {
  const [cliente, setCliente] = useState<Cliente | null>(null)

  useEffect(() => {
    if (!cliente) {
      validateClient()
    }
  }, [cliente])

  async function validateClient() {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`/api/users/validate`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        method: "POST"
      })

      if (response.status == 200) {
        const data = await response.json()
        setCliente(data)
      } else {
        localStorage.removeItem("clientId")
      }
    } catch (error) {
      console.error("Error validating client:", error)
      localStorage.removeItem("clientId")
    }
  }

  return (
    <nav className="bg-orange-400 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo.png" alt="Móveis" width={64} height={64} />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Loja de Móveis</span>
        </Link>
        {cliente ? (
          <span className="text-black dark:text-gray-300">
            Bem vindo(a), {cliente.name}
            {cliente?.profile === "Admin" && (
              <Link href="/adicionar" className="text-white dark:text-gray-300 px-2 ml-2 rounded-xl bg-orange-600">
                + Adicionar Produto
              </Link>
            )}
            {cliente?.profile === "Admin" && (
              <Link href="/dashboard" className="text-white dark:text-gray-300 px-2 ml-2 rounded-xl bg-orange-600">
                Dashboard
              </Link>
            )}
            <button
              className="text-black dark:text-gray-300 ml-2"
              onClick={async () => {
                localStorage.removeItem("token")
                setCliente(null)
              }}
            >
              | Sair
            </button>
          </span>
        ) : (
          <span>
            <Link href="/login" className="text-black dark:text-gray-300">
              Login
            </Link>
          </span>
        )}
      </div>
    </nav>
  )
}
