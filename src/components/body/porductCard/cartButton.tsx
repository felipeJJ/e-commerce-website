import { useState } from "react"
import CartIcon from "./cartIcon"
import { useCartContext } from "@/contexts/cartContext" 

interface ProductCardProps {
    productId: string
  }

export default function CartButton({ productId }: ProductCardProps) {
    const{ setCount, count } = useCartContext()
    const [ isAnimating, setIsAnimating ] = useState(false)


    function handleCart(){
        let cartItems = localStorage.getItem('cart-items')
        if(cartItems) {
            let cartItemsArray = JSON.parse(cartItems)

            let existingProductIndex = cartItemsArray.findIndex((item: { id: string; }) => item.id === productId)

            if(existingProductIndex != -1){
                cartItemsArray[existingProductIndex].quantity += 1
            } else {
                cartItemsArray.push({ productId, quantity: 1, id: productId })
            }

            localStorage.setItem('cart-items', JSON.stringify(cartItemsArray))
            setCount(cartItemsArray.length)
        } else {
            const newCart = [{ productId, quantity: 1, id: productId }]
            localStorage.setItem('cart-items', JSON.stringify(newCart))
            setCount(newCart.length)
        }
        localStorage.setItem('count', JSON.stringify(count+1))

        setIsAnimating(true)

        setTimeout(() => {
            setIsAnimating(false)
        }, 1000)

    }

  return (
    <button
        onClick={handleCart}
        className={`mr-4 mt-1 w-8 h-8 pl-1 bg-gray-100 rounded-full ${isAnimating ? ' animate-ping' : ''}`}
    >
        <CartIcon />
    </button>
  )
}
