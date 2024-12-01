"use client"

import { useState, useEffect } from "react"

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }
    fetchOrders()
  }, [])

  const handleAprove = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/aprove`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      })
      if (response.ok) {
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error approving order:", error)
    }
    window.location.reload()
  }

  const handleReject = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      })
      if (response.ok) {
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error("Error rejecting order:", error)
    }
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-screen-xl mx-auto p-4">
        <h1 className="mb-5 mt-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
          Lista de Pedidos
        </h1>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Pedido ID: {order.id}</h2>
                <span className="text-sm text-gray-600">
                  Status:{" "}
                  {order.status == "Aprovado" && <span className="text-green-500 font-semibold">{order.status}</span>}
                  {order.status == "Rejeitado" && <span className="text-red-500 font-semibold">{order.status}</span>}
                  {order.status == "Pendente" && <span className="text-yellow-500 font-semibold">{order.status}</span>}
                </span>
                <p className="text-sm text-gray-600">Data de Criação: {new Date(order.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  Última Atualização: {new Date(order.updatedAt).toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold mt-4">Produtos:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((productOrder: any) => (
                    <li key={productOrder.productId} className="mt-2">
                      <div className="flex items-center space-x-4">
                        <img
                          src={productOrder.product.image}
                          alt={productOrder.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{productOrder.product.name}</p>
                          <p className="text-sm text-gray-600">Quantidade: {productOrder.quantity}</p>
                          <p className="text-sm text-gray-600">Preço: R$ {productOrder.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {order.status == "Pendente" && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleAprove(order.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleReject(order.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Rejeitar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 mt-10">Nenhum pedido encontrado.</p>
        )}
      </section>
    </main>
  )
}
