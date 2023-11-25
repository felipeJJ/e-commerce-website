'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ProductsResponse, Products } from '../../types'
import axios from 'axios'
import { useOrganizerContext } from './organizerContext'

const cartContext = createContext({
    count: 0,
    products: {
        message: '',
        produtos: []
    } as ProductsResponse,
    productsOnCart: [] as Products[],
    totalPrice: 0,
    itemsCount: 0,
    cep: '',
    setCep: (value: string) =>{},
    setItemsCount: (value: number) =>{},
    setTotalPrice:(value: number) =>{},
    setProductsOnCart: (value: Products[]) =>{},
    setProducts: (value: ProductsResponse) =>{},
    setCount:(value: number) =>{},
})
export const useCartContext = () => {
    return useContext(cartContext)
}

interface providerProps{
    children: ReactNode
}

export function CartContextProvider({ children }: providerProps) {
    const { setProductCount, itemsPerPage } = useOrganizerContext()
    const [count, setCount] = useState(0)
    const [products, setProducts] = useState<ProductsResponse>({
        message: '',
        produtos: []
    })
    const [productsOnCart, setProductsOnCart] = useState<Products[]>([])
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ itemsCount, setItemsCount ] = useState(0)
    const [ cep, setCep ] = useState('')


    useEffect(() => {
        axios.get('/api/getProductsApi').then(response => {
          setProducts(response.data)
          const totalItems = response.data.produtos.length
          setProductCount(Math.ceil(totalItems / itemsPerPage))
        })
    }, [itemsPerPage, setProductCount])

    return (
        <cartContext.Provider value={{ count, products, productsOnCart, totalPrice, itemsCount, cep,
            setCep, setItemsCount, setTotalPrice, setProductsOnCart, setProducts, setCount }}
        >
            {children}
        </cartContext.Provider>
    )
}
