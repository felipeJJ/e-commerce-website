'use client'

import MainBody from "@/components/body/mainBody"
import { OriganizerContextProvider } from "@/contexts/organizerContext"

export default function Home() {
  return(
    <OriganizerContextProvider>
      <main>
        <MainBody/>
      </main>
    </OriganizerContextProvider>
  )
}