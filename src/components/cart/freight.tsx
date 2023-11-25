import { useState } from "react"
import TruckIcon from "./truckIcon"
import { useCartContext } from "@/contexts/cartContext"

export default function Freight() {

    const { setCep, cep } = useCartContext()
    const [isAnimating, setIsAnimating] = useState(false)

    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formattedCep = event.target.value.replace(/\D/g, '')

        if (formattedCep.length > 5) {
            formattedCep = formattedCep.replace(/^(\d{5})(\d)/, '$1-$2')
        }
        setCep(formattedCep)
    }

    function handleFreight() {
        setIsAnimating(true)

        setTimeout(() => {
            setIsAnimating(false)
        }, 1000)
    }

    return(
        <div className="w-[352px] h-[250px] bg-gray-50 px-6 py-6 rounded-xl shadow-lg">
            <p className="text-xl font-semibold">FRETE E PRAZOS</p>
            <div className="flex mt-6 first-letter justify-between">
                <input
                    className="bg-gray-50 border-2 border-gray-100 outline-red-500 w-32 rounded-xl px-3"
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="Digite o CEP"
                    maxLength={9} 
                />
                <button className={`flex bg-slate-200 px-3 py-1 rounded-lg ${isAnimating ? 'sm:animate-pulse' : ''}`} 
                    onClick={handleFreight}
                >
                    <TruckIcon/>
                    Calcular
                </button>
            </div>
        </div>
    )
}