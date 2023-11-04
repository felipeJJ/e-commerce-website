"use client"

import { Saira } from "next/font/google"
import FilterBar from "./filterBar/filterBar"
import ProductCard from "./porductCard/productCard"
import Pagination from "./filterBar/pagination"

const saira = Saira({
    subsets: ['latin'],
    weight:['400', '600'],
    variable: '--font-saira',
})

export default function MainBody() {
  
  return (
    <div className={`${saira.variable} font-serif w-full h-full`}>
      <div className="sm:mx-40 pb-20 max-w-fit mx-auto ">
        <FilterBar/>
        <section className="pb-16 grid 2xl:grid-cols-5 xl:grid-cols-4 
          lg:grid-cols-3 md:grid-cols-2 2xl:gap-16 xl:gap-12 lg:gap-16 md:gap-40 gap-8"
        >
          <ProductCard/>
        </section>
        <Pagination/>
      </div>
    </div>
  )
}
