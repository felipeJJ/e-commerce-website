'use client'

import './globals.css'
import Header from '@/components/header/header'
import { SessionProvider } from 'next-auth/react'
import { FilterContextProvider } from "@/contexts/filterContext"
import { CartContextProvider } from '@/contexts/cartContext'
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css'
import {  Saira, Saira_Stencil_One } from 'next/font/google'


const sairaStencil = Saira_Stencil_One({
  weight:['400'],
  subsets: ['latin'],
  variable: '--font-saira-stencil',
})

const saira = Saira({
  subsets: ['latin'],
  weight:['300','400', '500', '600'],
  variable: '--font-saira',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${sairaStencil.variable} ${saira.variable}`}>
      <SessionProvider>
        <body className='bg-white'>
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