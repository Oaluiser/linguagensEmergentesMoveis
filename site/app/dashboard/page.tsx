"use client"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { useRouter } from "next/navigation"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0)
  const [topProducts, setTopProducts] = useState([])
  const [ordersCount, setOrdersCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")

        const productsResponse = await fetch("/api/products/count", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const ordersResponse = await fetch("/api/orders/count", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const topProductsResponse = await fetch("/api/products/top")

        if (!productsResponse.ok || !ordersResponse.ok || !topProductsResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const productsData = await productsResponse.json()
        const ordersData = await ordersResponse.json()
        const topProductsData = await topProductsResponse.json()

        setProductsCount(productsData.count)
        setOrdersCount(ordersData.count)
        setTopProducts(topProductsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const data = {
    labels: topProducts.map((product: any) => product.name),
    datasets: [
      {
        label: "Quantidade Vendida",
        data: topProducts.map((product: any) => product.sold),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Top Produtos Mais Vendidos"
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-screen-xl mx-auto p-4">
        <h1 className="mb-5 mt-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md hover:bg-orange-50" onClick={() => router.push("/")}>
            <h2 className="text-xl font-bold mb-2">Total de Produtos</h2>
            <p className="text-3xl">{productsCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:bg-orange-50" onClick={() => router.push("/pedidos")}>
            <h2 className="text-xl font-bold mb-2">Total de Pedidos</h2>
            <p className="text-3xl">{ordersCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={data} options={options} />
        </div>
      </section>
    </main>
  )
}
