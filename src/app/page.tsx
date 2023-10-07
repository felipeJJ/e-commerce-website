"use client"
import axios from "axios"
import { useEffect, useState } from "react"

interface FormData {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagens?: any;  
  categoria: any;
}


export default function Home() {
  const [products, setProducts] = useState<FormData[]>([])
  useEffect(() => {
    axios.get('/api/getProductsApi').then(response => {
      setProducts(response.data);
    })

  }, [])
  console.log(products)
  return (
  <div></div>
  )
}


