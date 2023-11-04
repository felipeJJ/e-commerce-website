import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ProductsResponse } from '../../types'
import axios from 'axios'
import { useOrganizerContext } from './organizerContext'

const cartContext = createContext({
    count: 0,
    products: {
        message: '',
        produtos: []
    } as ProductsResponse,
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

    useEffect(() => {
        axios.get('/api/getProductsApi').then(response => {
          setProducts(response.data)
          const totalItems = response.data.produtos.length
          setProductCount(Math.ceil(totalItems / itemsPerPage))
        })
    }, [itemsPerPage, setProductCount])

    return (
        <cartContext.Provider value={{ count, products, setProducts, setCount }}
        >
            {children}
        </cartContext.Provider>
    )
}
