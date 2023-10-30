'use client'

import MainBody from "@/components/body/mainBody"
import { FilterContextProvider } from "@/contexts/filterContext"

export default function Home() {
  return(
    <FilterContextProvider>
      <main>
        <MainBody/>
      </main>
    </FilterContextProvider>
  )
}