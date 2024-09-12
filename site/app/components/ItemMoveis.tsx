import { useState } from "react"
import { Modal } from "./modal"
import Image from "next/image"

export function ItemMoveis({ product }: { product: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
          </div>
        </div>
      </Modal>
    </>
  )
}
