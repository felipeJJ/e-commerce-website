'use client'

import MainBody from "@/components/body/mainBody"
import { FilterContextProvider } from "@/contexts/filterContext"
import { OriganizerContextProvider } from "@/contexts/organizerContext"

export default function Home() {
  return(
    <FilterContextProvider>
      <OriganizerContextProvider>
        <main>
          <MainBody/>
        </main>
      </OriganizerContextProvider>
    </FilterContextProvider>
  )
}