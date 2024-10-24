"use client"

import { useState, useEffect } from "react"
import { InputPesquisa } from "./components/InputPesquisa"
import { ItemMoveis } from "./components/ItemMoveis"

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100">
      <InputPesquisa onSearch={setProducts} />
      <section className="max-w-screen-xl mx-auto p-4">
        <h1 className="mb-5 mt-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
          Móveis
          <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">
            em destaque
          </span>
        </h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ItemMoveis key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 mt-10">
            Infelizmente não encontramos nenhum produto com essas características.
          </p>
        )}
      </section>
    </main>
  )
}
