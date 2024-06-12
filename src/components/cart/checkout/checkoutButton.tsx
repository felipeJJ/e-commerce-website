'use client'

import { useCheckoutContext } from "@/contexts/checkoutContext"
import { useCartContext } from "@/contexts/cartContext"
import { usePathname, useRouter } from "next/navigation"
import withReactContent from "sweetalert2-react-content"
import { useSession } from "next-auth/react"
import { ApiResponse } from "../../../../types"
import Swal from "sweetalert2"
import axios from "axios"

export default function CheckoutButton(){
    const { itemsCount, freightValue } = useCartContext()
    const { amount, selectedCardId, setTransactionStatus, setUserId, } = useCheckoutContext()
    const { data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()
    
    const MySwal = withReactContent(Swal)
    
    let buttonName = "CONTINUAR"
    
    function verifyEmailAcount(email: string | null | undefined){
        axios.get(`/api/userInfoApi?email=${email}` ).then(response => {
            if (response.status === 200) {
                sessionStorage.setItem('userData', JSON.stringify(response.data.user))
                router.push('/checkout')
            } 
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                MySwal.fire({
                    title: "Cadastro do usuário",
                    text: "Por favor termine o cadastro do usuário na próxima página",
                    confirmButtonColor: "#3085d6"
                }).then((result) => {
                    if (result.isConfirmed){
                        router.push('/signup')
                    }
                })
            } else {
                console.error("Erro ao buscar usuário:", error)
            }
        })
    }

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

    async function handleSubmit(){
        const userId = getUserIdFromSessionStorage()
        setUserId(userId)
        const cardId = selectedCardId

        try {
            const response = await axios.post<ApiResponse>("/api/cieloApi", { userId, amount, cardId })
            if(response.status === 200){
                if(response.data.Payment.ReturnCode === "4" || response.data.Payment.ReturnCode === "6"){
                    setTransactionStatus("authorized")
                } else {
                    setTransactionStatus("unauthorized")
                }
            }
        } catch (error) {
            console.error("Erro ao finalizar a compra:", error)
            setTransactionStatus("error")
        }   
    }

    function handleCheckout() {
        if(session){
            if(pathName === "/checkout"){
                handleSubmit()
            } else {
                verifyEmailAcount(session.user?.email)
            }
        } else {
            MySwal.fire({
                title: "Nenhum usuário!",
                text: "Por favor, faça Login antes de efetuar a compra",
                confirmButtonColor: "#3085d6"
            }).then((result) => {
                if (result.isConfirmed){
                    router.push('/signin')
                }
            })
        }
    }

    if(pathName === '/checkout'){
        buttonName = "FINALIZAR"
    }

    const isButtonDisabled = () => {
        if (pathName === '/checkout') {
            return !itemsCount || !selectedCardId || !freightValue
        }
        return !itemsCount
    }

    return(
        <button 
            disabled={isButtonDisabled()}
            onClick={handleCheckout}
            className="w-[304px] h-11 mt-10 bg-[#51B853] text-white rounded-lg">
            {buttonName}
        </button>
    )
}
