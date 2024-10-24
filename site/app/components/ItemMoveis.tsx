import { useState } from "react"
import { Modal } from "./modal"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useClienteStore } from "../context/cliente"

export function ItemMoveis({ product }: { product: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { cliente } = useClienteStore()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    }
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/products`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, id: product.id })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const updatedProduct = await response.json()
      console.log("Product updated successfully:", updatedProduct)
      handleCloseEditModal()
      window.location.reload()
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  return (
    <>
      <div
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="relative w-full h-64">
          <Image className="object-cover" src={product.image} alt={product.name} layout="fill" />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
          <p className="mb-3 font-bold text-gray-900 dark:text-white">R$ {product.price.toFixed(2)}</p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex h-full">
          <div className="relative w-8/12 h-full">
            <Image className="object-cover" src={product.image} alt={product.name} layout="fill" />
          </div>
          <div className="w-4/12 p-5 bg-white rounded-r-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-800">{product.name}</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-600">{product.description}</p>
            <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-800">R$ {product.price.toFixed(2)}</p>
            {cliente ? (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleOpenEditModal}
              >
                Editar
              </button>
            ) : null}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <div className="flex h-full">
          <div className="relative w-8/12 h-full">
            <Image className="object-cover" src={product.image} alt={product.name} layout="fill" />
          </div>
          <div className="w-4/12 p-5 bg-white rounded-r-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-800">Editar Produto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descrição
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preço
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  id="image"
                  {...register("image")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2"
                  onClick={handleCloseEditModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
