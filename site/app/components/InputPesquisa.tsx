import { useState } from "react"

export function InputPesquisa({ onSearch }: { onSearch: (data: any) => void }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/searchProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: searchTerm })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      onSearch(data)
    } catch (error) {
      console.error("Error during fetch:", error)
    }
  }

  return (
    <section className="flex justify-center max-w-5xl mx-auto mt-6 px-4">
      <form className="w-full max-w-2xl" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Qual móvel você procura?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </form>
    </section>
  )
}
