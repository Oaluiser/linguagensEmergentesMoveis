"use client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type Inputs = {
  name: string
  price: string
  image: string
  description: string
}

export default function AdicionarProduto() {
  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()

  async function adicionarProduto(data: Inputs) {
    const response = await fetch(`/api/products`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name: data.name, price: data.price, image: data.image, description: data.description })
    })
    if (response.status === 200) {
      router.push("/")
    } else {
      alert("Erro... Não foi possível adicionar o produto")
    }
  }

  return (
    <section className="bg-orange-100 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Adicionar Produto
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(adicionarProduto)}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nome do Produto:
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nome do Produto"
                  required
                  {...register("name")}
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Preço:
                </label>
                <input
                  type="text"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Preço"
                  required
                  {...register("price")}
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  URL da Imagem:
                </label>
                <input
                  type="text"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="URL da Imagem"
                  required
                  {...register("image")}
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Descrição:
                </label>
                <textarea
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição do Produto"
                  required
                  {...register("description")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Adicionar Produto
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
