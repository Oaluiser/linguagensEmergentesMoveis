"use client"

import { useClienteStore } from "../context/cliente"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export function Header() {
  const { cliente, logaCliente } = useClienteStore()

  useEffect(() => {
    if (!cliente) {
      const clientId = localStorage.getItem("clientId")
      if (clientId) {
        validateClient(clientId)
      }
    }
  }, [cliente])

  async function validateClient(clientId: string) {
    try {
      const response = await fetch(`/api/users/validate`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ id: clientId })
      })
      if (response.status === 200) {
        const clientData = await response.json()
        console.log("Client validated:", clientData)
        logaCliente(clientData)
        console.log("Client logged in")
        console.log("Client data:", clientData)
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
          <span className="text-black dark:text-gray-300">Bem vindo(a), {cliente.name}</span>
        ) : (
          <Link href="/login" className="text-black dark:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
