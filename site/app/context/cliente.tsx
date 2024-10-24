"use client"

import React, { createContext, useContext, useState } from "react"

interface ClienteContextProps {
  cliente: any
  logaCliente: (dados: any) => void
  setClientData: (data: { email: string; password: string }) => void
}

const ClienteContext = createContext<ClienteContextProps | undefined>(undefined)

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [cliente, setCliente] = useState(null)
  const [clientData, setClientData] = useState<{ email: string; password: string } | null>(null)

  const logaCliente = (dados: any) => {
    setCliente(dados)
  }

  const handleSetClientData = (data: { email: string; password: string }) => {
    setClientData(data)
  }

  return (
    <ClienteContext.Provider value={{ cliente, logaCliente, setClientData: handleSetClientData }}>
      {children}
    </ClienteContext.Provider>
  )
}

export function useClienteStore() {
  const context = useContext(ClienteContext)
  if (context === undefined) {
    throw new Error("useClienteStore must be used within a ClienteProvider")
  }
  return context
}
