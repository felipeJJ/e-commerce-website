'use client'

import './globals.css'
import Header from '@/components/header/header'
import { FilterContextProvider } from "@/contexts/filterContext"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
      <FilterContextProvider>
        <Header></Header>
        {children}
      </FilterContextProvider>
      </body>
    </html>
  )
}
