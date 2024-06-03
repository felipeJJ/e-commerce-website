import 'react-credit-cards-2/dist/es/styles-compiled.css'
import Cards from 'react-credit-cards-2'
import { useState } from 'react'
import InputMask from '@mona-health/react-input-mask'
import { useFormContext } from 'react-hook-form'

export default function CreditCardForm() {
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: "",
        expirationDate: "",
        cvc: "",
        cardHolderName: "",
        focus: "" as "cardHolderName" | "cardNumber" | "expirationDate" | "cvc" | ""
    })

    const { register, formState: { errors }, setValue } = useFormContext()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCreditCardInfo((prev) => ({ 
            ...prev, [name]: name === "cardHolderName" ? value.toUpperCase() : value
        }))
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setCreditCardInfo((prev) => ({ ...prev, focus: e.target.name as "cardHolderName" | "cardNumber" | "expirationDate" | "cvc" }))
    }

    return (
        <div className="flex">
            <div className="flex flex-col gap-1 min-w-fit max-w-min">
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
                <label className="input input-bordered flex items-center gap-2 ">
                    Data de expiração:
                    <InputMask
                        className="grow max-w-min"
                        mask="99/9999"
                        placeholder="MM/YYYY"
                        {...register("expirationDate")}
                        value={creditCardInfo.expirationDate}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </label>
                <p className="text-sm text-red-800 pl-2 mt-1">{errors.expirationDate?.message as string}</p>
                <label className="input input-bordered flex items-center gap-2 min-w-fit">
                    Código de segurança:
                    <InputMask
                        className="grow max-w-min"
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
            <div className="ml-5 mt-5">
                <Cards
                    number={creditCardInfo.cardNumber.replace(/\s/g, '')}
                    expiry={creditCardInfo.expirationDate}
                    cvc={creditCardInfo.cvc}
                    name={creditCardInfo.cardHolderName}
                    focused={creditCardInfo.focus}
                />
            </div>
        </div>
    )
}
