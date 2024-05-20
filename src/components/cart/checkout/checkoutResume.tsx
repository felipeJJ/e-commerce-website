'use client'

import { useCartContext } from "@/contexts/cartContext"
import FreightController from "../freight/freightController"
import CheckoutButton from "./checkoutButton"

export default function CheckoutResume() {
    const { totalPrice, freightValue} = useCartContext()
    const formatedFreightValue = Number(freightValue.replace(',', '.'))
    
    return(
        <div className="mt-10">
            <FreightController/>
            <div className=" w-[352px] h-[330px] bg-gray-50 mt-3 px-6 py-6 rounded-xl shadow-lg">
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
                <CheckoutButton/>
            </div>
        </div>
    )
}