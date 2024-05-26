'use client'

import { useCartContext } from "@/contexts/cartContext"
import BackIcon from "@/components/cart/backIcon"
import { useRouter } from "next/navigation"
import { Products } from "../../../types"
import { useEffect } from "react"

interface CartInfoProps {
    tituliInfo: string;
}

export default function CartInfo({tituliInfo}: CartInfoProps) {
    const router = useRouter()
    const { products, totalPrice, itemsCount, setItemsCount, setProductsOnCart, setTotalPrice } = useCartContext()
    
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
            setItemsCount(totalItemsTemp)

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
    }, [products.produtos, setItemsCount, setProductsOnCart, setTotalPrice])

    function handleBack(){
        router.back()
    }

    return(
        <>
            <button onClick={handleBack} className="flex mt-6">
                <BackIcon/>
                <p className=" text-[#737380]">Voltar</p>
            </button>
            <h2 className="font-medium text-2xl mt-5">{tituliInfo}</h2>
            <div className="flex gap-1 mt-1">
                <h3>{`Total (${itemsCount} ${itemsCount === 1 ? 'produto' : 'produtos'})`}</h3>
                <h3 className="font-semibold">{`R$${totalPrice.toFixed(2)}`}</h3>
            </div>
        </>
    )
}