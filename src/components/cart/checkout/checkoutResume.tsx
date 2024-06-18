'use client'

import { useCartContext } from "@/contexts/cartContext"
import { useCheckoutContext } from "@/contexts/checkoutContext"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import CheckoutButton from "@/components/checkout/checkoutButton"
import FreightController from "../freight/freightController"
import CartButton from "./cartButton"

export default function CheckoutResume() {
    const [isCheckout, setIsCheckout] = useState(false)

    const { totalPrice, freightValue } = useCartContext()
    const { setAmount } = useCheckoutContext()
    const pathName = usePathname()
    
    const formatedFreightValue = Number(freightValue.replace(',', '.'))

    let calcAmount = Number((totalPrice + formatedFreightValue).toFixed(2))*100

    useEffect(() => {
        if(pathName === "/checkout"){
            setIsCheckout(true)
        }
        setAmount(calcAmount)
    }, [calcAmount, pathName, setAmount])

    return(
        <div className="mt-10">
            <FreightController/>
            <div className="w-full h-auto md:flex-row md:w-[352px] md:h-[330px] bg-gray-50 mt-3 px-6 py-6 rounded-xl shadow-lg">
                <h1 className="text-xl font-semibold ">RESUMO DO PEDIDO</h1>
                <div className="flex justify-between mt-7">
                    <p>Subtotal</p>
                    <p>R$ {totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-3">
                    <p>Entrega</p>
                    <p>R$ {formatedFreightValue.toFixed(2)}</p>
                </div>
                <div className="w-[304px] h-[1px] bg-[#DCE2E5] mt-6"></div>     
                <div className="flex justify-between mt-4">
                    <p>Totoal</p>
                    <p>{(totalPrice + formatedFreightValue).toFixed(2)}</p>
                </div>
                {isCheckout? <CheckoutButton/> : <CartButton/>}
            </div>
        </div>
    )
}