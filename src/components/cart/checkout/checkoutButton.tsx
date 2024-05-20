import { useCartContext } from "@/contexts/cartContext"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import axios from "axios"

export default function CheckoutButton(){
    const { itemsCount } = useCartContext()
    const {data: session} = useSession()
    const router = useRouter()

    const MySwal = withReactContent(Swal)
    
    function verifyEmailAcount(email: string | null | undefined){
        axios.get(`/api/userInfoApi?email=${email}` ).then(response => {
            if (response.status === 200) {
                // router.push('/checkout')
            } 
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                MySwal.fire({
                    title: "Cadastro do usuário",
                    text: "Por favor termine o cadastro do usuário na pagina a seguir",
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

    function handleCheckout() {
        if(session){
            verifyEmailAcount(session.user?.email)
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

    return(
        <button 
            disabled={!itemsCount}
            onClick={handleCheckout}
            className="w-[304px] h-11 mt-10 bg-[#51B853] text-white rounded-lg">
            CONTINUAR
        </button>
    )
}