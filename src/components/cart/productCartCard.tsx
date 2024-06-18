'use client'

import Image from "next/image"
import { useCartContext } from "@/contexts/cartContext"
import TrashIcon from "./trashIcon"
import { useEffect } from "react"

export default function ProductCartCard() {
    const { productsOnCart, setCount } = useCartContext()

    const quantities = Array.from({ length: 10 }, (_, i) => i + 1)

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
        setCount(cartItems.length)
    }, [setCount])

    const handleQuantityChange = (productId: string, newQuantity: string) => {
        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
        const updatedCartItems = cartItems.map((item: { productId: string }) => {
            if (item.productId === productId) {
                return { ...item, quantity: Number(newQuantity) }
            }
            return item
        })
        localStorage.setItem('cart-items', JSON.stringify(updatedCartItems))
        window.location.reload()
    }

    const handleDelete = (productId: string) => {
        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
        const updatedCartItems = cartItems.filter((item: { productId: string }) => item.productId !== productId)
        localStorage.setItem('cart-items', JSON.stringify(updatedCartItems))
        window.location.reload()
    }

    return (
        <>
            {productsOnCart.map((product) => {
                if (!product) return null
                const cartItem = JSON.parse(localStorage.getItem('cart-items') || '[]')
                    .find((item: { productId: string }) => item.productId === product._id)
                const initialQuantity = cartItem ? cartItem.quantity : 1
                return (
                    <section key={product._id} className="flex flex-col w-full h-auto md:flex-row md:w-[736px] md:h-[211px] mt-6 bg-gray-50 rounded-xl shadow-lg">
                        <div className="w-full md:w-64 h-[211px] relative md:relative right-0">
                            <Image
                                fill
                                src={product.imagens[1]}
                                alt="Product image"
                                style={{ objectFit: "fill" }}
                                sizes="(max-width: 300px) 100vw"
                            />
                        </div>
                        <div id="description" className="w-full p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h1 className="font-light text-xl">{product.nome}</h1>
                                <button className="md:mr-5" onClick={() => handleDelete(product._id)}>
                                    <TrashIcon />
                                </button>
                            </div>
                            <p className="bg-gray-50 mt-3 text-xs overflow-y-scroll h-20">{product.descricao}</p>
                            <div className="mt-6 flex justify-between items-center">
                                <select
                                    id="quantityItems"
                                    className="bg-gray-50 outline-none"
                                    value={initialQuantity}
                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                >
                                    {quantities.map(quantity => (
                                        <option key={quantity} value={quantity}>
                                            {quantity}
                                        </option>
                                    ))}
                                </select>
                                <p>R$ {(initialQuantity * product.preco).toFixed(2)}</p>
                            </div>
                        </div>
                    </section>
                )
            })}
        </>
    )
}
