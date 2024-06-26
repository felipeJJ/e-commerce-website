import 'react-credit-cards-2/dist/es/styles-compiled.css'
import Cards from 'react-credit-cards-2'
import { useState } from 'react'
import InputMask from '@mona-health/react-input-mask'
import { useFormContext } from 'react-hook-form'
import ExclamationIcon from './exclamationIcon'

type Focused = "cardHolderName" | "cardNumber" | "expirationDate" | "cvc" | "" | undefined

export default function CreditCardForm() {
    const [creditCardInfo, setCreditCardInfo] = useState<{
        cardNumber: string
        expirationDate: string
        cvc: string
        cardHolderName: string
        focus: Focused
    }>({
        cardNumber: "",
        expirationDate: "",
        cvc: "",
        cardHolderName: "",
        focus: undefined
    })

    const { register, formState: { errors }, setValue } = useFormContext()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCreditCardInfo((prev) => ({
            ...prev, [name]: name === "cardHolderName" ? value.toUpperCase() : value
        }))
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const focusMap: { [key: string]: Focused } = {
            cardNumber: "cardNumber",
            cardHolderName: "cardHolderName",
            expirationDate: "expirationDate",
            cvc: "cvc"
        }
        setCreditCardInfo((prev) => ({ ...prev, focus: focusMap[e.target.name] }))
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
                <label className="input input-bordered flex items-center gap-2">
                    Número do cartão:
                    <InputMask
                        className="grow"
                        mask="9999 9999 9999 9999"
                        placeholder="Card Number"
                        {...register("cardNumber")}
                        value={creditCardInfo.cardNumber}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </label>
                <p className="text-sm text-red-800 pl-2 mt-1">{errors.cardNumber?.message as string}</p>
                <label className="input input-bordered flex items-center gap-2">
                    Nome do cartão:
                    <input
                        className="grow"
                        type="text"
                        placeholder="Name"
                        {...register("cardHolderName")}
                        value={creditCardInfo.cardHolderName}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </label>
                <p className="text-sm text-red-800 pl-2 mt-1">{errors.cardHolderName?.message as string}</p>
                <label className="input input-bordered flex items-center gap-2">
                    Data de expiração:
                    <InputMask
                        className="grow"
                        mask="99/9999"
                        placeholder="MM/YYYY"
                        {...register("expirationDate")}
                        value={creditCardInfo.expirationDate}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </label>
                <p className="text-sm text-red-800 pl-2 mt-1">{errors.expirationDate?.message as string}</p>
                <label className="input input-bordered flex items-center gap-2">
                    Código de segurança:
                    <InputMask
                        className="grow"
                        mask="999"
                        placeholder="CVC"
                        {...register("cvc")}
                        value={creditCardInfo.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </label>
                <p className="text-sm text-red-800 pl-2 mt-1">{errors.cvc?.message as string}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-5 md:w-1/2">
                <Cards
                    number={creditCardInfo.cardNumber.replace(/\s/g, '')}
                    expiry={creditCardInfo.expirationDate}
                    cvc={creditCardInfo.cvc}
                    name={creditCardInfo.cardHolderName}
                    focused={creditCardInfo.focus}
                />
                <div className="mt-3 flex gap-1 md:ml-5">
                    <ExclamationIcon/>
                    <div>
                        <p className="text-sm text-red-700">VALIDAÇÃO SANDBOX:</p>
                        <p className="text-sm">Apenas cartões com final 0/1/4 terão transação AUTORIZADA</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
