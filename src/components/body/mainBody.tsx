"use client"

import FilterBar from "./filterBar";
import ProductCard from "./productCard";
import axios from "axios"
import { useEffect, useState } from "react"
import { Category, Products } from "../../../types"

export default function MainBody() {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('/api/getProductsApi').then(response => {
      setProducts(response.data.produtos);
    });
      axios.get('/api/getCategoriesApi').then(response =>{
        setCategories(response.data);
      })
  }, []);

  return (
    <div className="w-full h-full">
      <FilterBar categories={categories}/>
      <section className="mx-40 pb-40 grid grid-cols-4 gap-8">
        <ProductCard products={products}/>
      </section>
    </div>
  );
}
