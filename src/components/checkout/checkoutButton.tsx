import { useCheckoutContext } from "@/contexts/checkoutContext"
import { useCartContext } from "@/contexts/cartContext"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { ApiResponse } from "../../../types"

export default function CheckoutButton() {
    const { freightValue, setCount } = useCartContext()
    const { amount, selectedCardId, userData, orderStatus, freight } = useCheckoutContext()

    const [products, setProducts] = useState([])
    const [userId, setUserId] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const productsData = localStorage.getItem('cart-items')
        const userData = sessionStorage.getItem('userData')

        if (userData && productsData) {
            try {
                const parsedUserData = JSON.parse(userData)
                const parsedProducts = JSON.parse(productsData)
                setUserId(parsedUserData._id)
                setProducts(parsedProducts)
            } catch (error) {
                console.error("Erro ao analisar dados de Storage:", error)
            }
        }
    }, [])

    async function postCieloApi() {
        try {
            const response = await axios.post("/api/cieloApi", { userId, amount, cardId: selectedCardId })
            if (response.status === 200) {
                const data: ApiResponse = response.data.response
                if (data.Payment.ReturnCode === "4" || data.Payment.ReturnCode === "6") {
                    return data.Payment
                } else {
                    // TODO: cartao nao autorizado error
                }
            }
        } catch (error) {
            console.error("Erro ao finalizar a compra:", error)
        }
    }

    async function postPurchaseOrder(paymentData: any) {
        const purchaseData = {
            userId: userId,
            products: products,
            freight: freight,
            payment: paymentData,
            status: orderStatus,
            shippingAddress: {
                recipientName: userData.name,
                street: userData.address,
                city: userData.city,
                state: userData.state,
                district: userData.district,
                postalCode: userData.zip,
                country: "BR"
            },
        }

        try {
            const response = await axios.post("/api/newOrderApi", purchaseData, {
                headers: { 'Content-Type': 'application/json' }
            })
            handleResponse(response)
        } catch (error) {
            console.error("Erro ao enviar ordem de compra:", error)
        }
    }

    const handleResponse = (response: AxiosResponse<any, any>) => {
        if (response.status === 200) successToast()
        else errorToast()
    }

    const successToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: "success",
            title: "Compra realizada com sucesso!"
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                clearStorageAndRedirect()
            }
        })
    }

    const errorToast = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: "error",
            title: "Erro ao finalizar compra, por favor tente mais tarde!"
        })
    }

    const clearStorageAndRedirect = () => {
        localStorage.removeItem("count")
        localStorage.removeItem("cart-items")
        sessionStorage.removeItem("cart-items")
        setCount(0)
        router.push('/')
    }

    const handleSubmit = async () => {
        const paymentData = await postCieloApi()
        if (paymentData) {
            await postPurchaseOrder(paymentData)
        }
    }

    return (
        <button
            disabled={!selectedCardId ||!freightValue}
            onClick={handleSubmit}
            className="btn border-0 sm:w-[304px] w-full h-11 mt-10 bg-[#51B853] text-white rounded-lg">
            FINALIZAR
        </button>
    )
}
