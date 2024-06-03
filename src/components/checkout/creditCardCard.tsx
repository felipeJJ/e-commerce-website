'use client'

import axios from "axios"
import React, { useState, useEffect, useCallback } from "react"
import CreditCardController from "./creditCardController"
import { creditCardData } from "../../../types"

export default function CreditCardCard() {
    const [creditCards, setCreditCards] = useState<creditCardData[]>([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    
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
    
    const fetchCreditCards = useCallback(async () => {
        const userId = getUserIdFromSessionStorage()
        if (!userId) return

        try {
            const response = await axios.get<{ creditCards: creditCardData[] }>("/api/newCreditCardApi", {
                params: { userId }
            })
            setCreditCards(response.data.creditCards)
        } catch (error) {
            console.error("Error fetching credit cards:", error)
        }
    }, [])

    useEffect(() => {
        fetchCreditCards()
    }, [fetchCreditCards])

    return (
        <div className="h-fit w-full mt-6 p-6 bg-gray-50 rounded-xl shadow-lg">
            <details className="collapse collapse-arrow">
                <summary className="collapse-title bg-gray-50">
                    <div className="flex font-medium text-lg">
                        <h2 className="mr-10">2</h2>
                        <h2>FORMA DE PAGAMENTO</h2>
                    </div>
                </summary>
                <div className="collapse-content bg-gray-50">
                    <CreditCardController 
                        creditCards={creditCards} 
                        setError={setError} 
                        setSuccess={setSuccess} 
                        fetchCreditCards={fetchCreditCards}
                    />
                </div>
            </details>
            {success && (
                 <div role="alert" className="alert alert-success h-8 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" strokeWidth="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Cartão salvo com sucesso</span>
                </div>
            )}
            {error && (
                <div role="alert" className="alert alert-error h-8 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                    >   
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" strokeWidth="2" 
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}       
        </div>
    )
}
