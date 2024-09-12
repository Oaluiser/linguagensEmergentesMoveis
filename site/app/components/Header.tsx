import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <nav className="bg-orange-400 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo.png" alt="Móveis" width={64} height={64} />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Loja de Móveis</span>
        </Link>
      </div>
    </nav>
  )
}
