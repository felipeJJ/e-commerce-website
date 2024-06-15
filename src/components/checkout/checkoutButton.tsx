import {useCartContext} from "@/contexts/cartContext"
import {useCheckoutContext} from "@/contexts/checkoutContext"
import { ApiResponse } from "../../../types"
import axios from "axios"

export default function CheckoutButton() {
    const { freightValue } = useCartContext()
    const {amount, selectedCardId, setTransactionStatus, setUserId, setPayment} = useCheckoutContext()

    async function handleSubmit() {

        const getUserIdFromSessionStorage = () => {
            const userData = sessionStorage.getItem('userData')
            if (userData) {
                try {
                    const parsedUserData = JSON.parse(userData)
                    return parsedUserData._id
                } catch (error) {
                    console.error("Erro ao analisar userData do sessionStorage:", error)
                    return null
                }
            }
            return null
        }
        const userId = getUserIdFromSessionStorage()
        setUserId(userId)
        const cardId = selectedCardId

        try {
            const response = await axios.post < {
                message: string,
                response: ApiResponse
            } > ("/api/cieloApi", {userId, amount, cardId})
            if (response.status === 200) {
                const data: ApiResponse = response.data.response
                if (data.Payment.ReturnCode === "4" || data.Payment.ReturnCode === "6") {
                    setTransactionStatus("authorized")
                    setPayment(data.Payment)
                } else {
                    setTransactionStatus("unauthorized")
                }
            }
        } catch (error) {
            console.error("Erro ao finalizar a compra:", error)
            setTransactionStatus("error")
        }
    }
    return (
        <button 
            disabled={!selectedCardId || !freightValue}
            onClick={handleSubmit}
            className="w-[304px] h-11 mt-10 bg-[#51B853] text-white rounded-lg">
            FINALIZAR
        </button>
    )
}
