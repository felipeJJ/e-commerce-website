"use client"

import FilterBar from "./filterBar/filterBar";
import ProductCard from "./productCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { Products } from "../../../types"
import { useOrganizerContext } from "@/contexts/organizerContext"
import Pagination from "./filterBar/pagination"
import { Saira } from "next/font/google";

const saira = Saira({
    subsets: ['latin'],
    weight:['400', '600'],
    variable: '--font-saira',
})

export default function MainBody() {
  const { setProductCount, itemsPerPage } = useOrganizerContext()
  const [products, setProducts] = useState<Products[]>([])
  
  useEffect(() => {
    axios.get('/api/getProductsApi').then(response => {
      setProducts(response.data.produtos)
      const totalItems = response.data.produtos.length
      setProductCount(Math.ceil(totalItems / itemsPerPage))
    })
  }, [setProductCount, itemsPerPage]);
  
  return (
    <div className={`${saira.variable} font-serif w-full h-full`}>
      <FilterBar/>
      <div className="mx-40 pb-20 ">
        <section className=" pb-16 grid 2xl:grid-cols-5 grid-cols-4 gap-8">
          <ProductCard products={products}/>
        </section>
        <Pagination/>
      </div>
    </div>
  );
}
