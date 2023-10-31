"use client"

import FilterBar from "./filterBar";
import ProductCard from "./productCard";
import axios from "axios"
import { useEffect, useState } from "react"
import { Products } from "../../../types"

export default function MainBody() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    axios.get('/api/getProductsApi').then(response => {
      setProducts(response.data.produtos);
    })
  }, []);

  return (
    <div className="w-full h-full">
      <FilterBar/>
      <section className="mx-40 pb-40 grid 2xl:grid-cols-5 grid-cols-4 gap-8">
        <ProductCard products={products}/>
      </section>
    </div>
  );
}
