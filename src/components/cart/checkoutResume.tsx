'use client'

import { useCartContext } from "@/contexts/cartContext"
import Freight from "./freight"

export default function CheckoutResume() {
    const { totalPrice } = useCartContext()
    const entrega = 40 as number

    return(

        <div className=" mt-10">
            <Freight/>
            <div className=" w-[352px] h-[330px] bg-gray-50 mt-3 px-6 py-6 rounded-xl shadow-lg">
                <h1 className="text-xl font-semibold ">RESUMO DO PEDIDO</h1>
                <div className="flex justify-between mt-7">
                    <p>Subtotal</p>
                    <p>R$ {totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-3">
                    <p>Entrega</p>
                    <p>R$ {entrega.toFixed(2)}</p>
                </div>
                <div className="w-[304px] h-[1px] bg-[#DCE2E5] mt-6"></div>     
                <div className="flex justify-between mt-4">
                    <p>Totoal</p>
                    <p>{(totalPrice + entrega).toFixed(2)}</p>
                </div>
                <button className="w-[304px] h-11 mt-10 bg-[#51B853] text-white rounded-lg">
                    FINALIZAR A COMPRA
                </button>
            </div>
        </div>
    )
}