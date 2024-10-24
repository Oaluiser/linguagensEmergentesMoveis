import { Header } from "./components/Header"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { ClienteProvider } from "./context/cliente"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Loja Móveis",
  description: "Loja de móveis em Pelotas",
  keywords: ["loja", "moveis"]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ClienteProvider>
          <Header />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
