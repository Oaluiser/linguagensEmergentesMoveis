import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

type Inputs = {
  name: string
  description: string
  price: number
}

export default function EditItem() {
  const router = useRouter()
  const { productId } = router.query

  useEffect(() => {
    console.log(productId)
  }, [productId])
}
