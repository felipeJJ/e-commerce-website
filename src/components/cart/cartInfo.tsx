'use client'

import { useCartContext } from "@/contexts/cartContext"
import BackIcon from "@/components/cart/backIcon"
import { useRouter } from "next/navigation"
import { Products } from "../../../types"
import { useEffect, useState } from "react"


export default function CartInfo() {
    const router = useRouter()
    const { products, totalPrice, setProductsOnCart, setTotalPrice } = useCartContext()
    const [ totalItems, setTotalItems ] = useState(0)
    
    useEffect(() => {
        let cartItems = localStorage.getItem('cart-items')
        const prodctsArray: Products[] = products.produtos

        if (cartItems) {
            let cartItemsArray = JSON.parse(cartItems)

            let totalItemsTemp = cartItemsArray.reduce((acc: number, item: { quantity: number }) => {
                if (item.quantity) {
                return acc + item.quantity
                }
                return acc
            }, 0)
            setTotalItems(totalItemsTemp)

            const productsOnCart = cartItemsArray.map((item: { productId: string; quantity: number }) => {
                if (item.productId) {
                    const product = prodctsArray.find((p) => p._id === item.productId)
                    if (product) {
                        return {
                        ...product,
                        quantity: item.quantity,
                        }
                    }
                }
                return null
            })
            setProductsOnCart(productsOnCart)

            let totalTemp = productsOnCart.reduce((acc: number, product: { preco: number; quantity: number }) => {
                if (product) {
                    return acc + product.preco * product.quantity
                }
                return acc
            }, 0)
            setTotalPrice(totalTemp)
        }
    }, [products.produtos, setProductsOnCart, setTotalPrice])

    function handleBack(){
        router.push('/')
    }

    return(
        <>
            <button onClick={handleBack} className="flex mt-6">
                <BackIcon/>
                <p className=" text-[#737380]">Voltar</p>
            </button>
            <h2 className="font-medium text-2xl mt-5">SEU CARRINHO</h2>
            <div className="flex gap-1 mt-1">
                <h3>{`Total (${totalItems} ${totalItems === 1 ? 'produto' : 'produtos'})`}</h3>
                <h3 className="font-semibold">{`R$${totalPrice.toFixed(2)}`}</h3>
            </div>
        </>
    )
}