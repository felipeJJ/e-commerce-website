'use client'

import './globals.css'
import Header from '@/components/header/header'
import { FilterContextProvider } from "@/contexts/filterContext"
import { CartContextProvider } from '@/contexts/cartContext'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <CartContextProvider>
          <FilterContextProvider>
            <Header></Header>
            {children}
          </FilterContextProvider>
        </CartContextProvider>
      </body>
    </html>
  )
}
