"use client"

import FilterBar from "./filterBar";
import ProductCard from "./productCard";
import axios from "axios"
import { useEffect, useState } from "react"
import { Products } from "../../../types"
import { useOrganizerContext } from "@/contexts/organizerContext";

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
    <div className={`w-full h-full`}>
      <FilterBar/>
      <section className="mx-40 pb-40 grid 2xl:grid-cols-5 grid-cols-4 gap-8">
        <ProductCard products={products}/>
      </section>
    </div>
  );
}
