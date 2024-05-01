"use client"

import FilterBar from "./filterBar/filterBar"
import ProductCard from "./porductCard/productCard"
import Pagination from "./filterBar/pagination"

export default function MainBody() {
  
  return (
    <div className="font-serif w-full h-full">
      <div className="sm:mx-40 pb-20 max-w-fit mx-auto ">
        <FilterBar/>
        <section className="pb-16 grid 2xl:grid-cols-5 xl:grid-cols-4 
          lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3  grid-cols-2 2xl:gap-16 xl:gap-12 lg:gap-16 md:gap-40 gap-8"
        >
          <ProductCard/>
        </section>
        <Pagination/>
      </div>
    </div>
  )
}
