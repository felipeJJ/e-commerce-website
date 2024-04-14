'use client'

import './globals.css'
import Header from '@/components/header/header'
import { FilterContextProvider } from "@/contexts/filterContext"
import { CartContextProvider } from '@/contexts/cartContext'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <SessionProvider>
        <body>
          <CartContextProvider>
            <FilterContextProvider>
                <Header></Header>
                {children}
            </FilterContextProvider>
          </CartContextProvider>
        </body>
      </SessionProvider>
    </html>
  )
}