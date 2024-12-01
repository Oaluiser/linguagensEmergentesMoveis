"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/app/context/cliente"

type Inputs = {
  nome: string
  email: string
  senha: string
}

export default function Cadastro() {
  const { register, handleSubmit } = useForm<Inputs>()
  const { logaCliente, setClientData, cliente } = useClienteStore()
  const router = useRouter()

  async function verificaCadastro(data: Inputs) {
    const response = await fetch(`/api/users`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ name: data.nome, email: data.email, password: data.senha })
    })
    if (response.status == 201) {
      const dados = await response.json()
      logaCliente(dados)
      setClientData({ email: data.email, password: data.senha })
      localStorage.setItem("clientId", dados.id)
      router.push("/")
    } else {
      alert("Erro... Não foi possível realizar o cadastro")
    }
  }

  return (
    <section className="bg-orange-100 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Cadastro de Cliente
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaCadastro)}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Seu nome"
                  required
                  {...register("nome")}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  E-mail:
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  {...register("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("senha")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Cadastrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já tem uma conta?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Entre aqui
                </a>
              </p>{" "}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Você é admin?{" "}
                <a href="/cadastroAdmin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Cadastre-se aqui
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
