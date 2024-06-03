import axios from "axios"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { creditCardSchema } from "@/schemas/signupFormSchema"
import { creditCardData } from "../../../types"
import CreditCardForm from "./creditCardForm"
import PlusIcon from "./plusIcon"

interface CreditCardControllerProps {
    creditCards: creditCardData[]
    setError: (message: string) => void
    setSuccess: (success: boolean) => void
    fetchCreditCards: () => void
}

export default function CreditCardController({ creditCards, setError, setSuccess, fetchCreditCards }: CreditCardControllerProps) {
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

    const methods = useForm({
        resolver: yupResolver(creditCardSchema),
        mode: "all"
    })

    const onSubmit = async (data: creditCardData) => {
        try {
            (document.getElementById('my_modal_1') as HTMLDialogElement).close()

            const userDataString = sessionStorage.getItem('userData')

            if (!userDataString) throw new Error('usuário não encontrado')
            const userData = JSON.parse(userDataString)
            const userId = userData._id

            const requestData = { ...data, userId }

            const response = await axios.post("/api/newCreditCardApi", requestData, {
                headers: {'Content-Type': 'application/json'}
            })
            if (response.status === 200 ){
                setSuccess(true)
                fetchCreditCards()
                setTimeout(()=>{
                    setSuccess(false)
                }, 3000)
            } else {
                renderError(response.data.message)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                renderError(error.response.data.message)
            } else {
                renderError("Erro ao cadastrar novo cartão de crédito, por favor tente mais tarde")
            }
        }
    }

    function renderError(msg: string) {
        setError(msg)
        setTimeout(()=>{
            setError("")
        }, 6000)
    }

    return (
        <>
            {creditCards.map((card) => (
                <div 
                    key={card._id} 
                    className={`mb-4 ${selectedCardId === card._id ? 'border rounded-md border-gray-300 p-4' : ''}`}
                >
                    <input
                        type="radio"
                        id={`card-${card._id}`}
                        name="selectedCard"
                        value={card._id}
                        className="mr-2 bg-white"
                        onChange={() => setSelectedCardId(card._id as string || null)}
                    />
                    <label className="" htmlFor={`card-${card._id}`}>
                        <span>{card.cardHolderName}</span>, terminando em {card.cardNumber}
                    </label>
                </div>
            ))}
            <div className="flex gap-1 -translate-x-0.5">
                <PlusIcon/>
                <a id="modal-card" className="link text-cyan-600"
                    onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}
                >
                    Adicionar um cartão de crédito
                </a>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box max-w-3xl p-6">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h2 className="font-bold text-2xl mb-6">Adicionar um cartão de crédito</h2>
                        <FormProvider {...methods}>
                            <form 
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className="flex flex-col"
                                method="dialog"
                            >
                                <CreditCardForm/>
                                <button className="btn btn-success w-2/4 mt-6 mx-auto" type="submit">Submit</button>
                            </form>
                        </FormProvider>
                    </div>
                </dialog>
            </div>
        </>
    )
}
