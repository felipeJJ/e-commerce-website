import React from 'react'
import { DeliveryOption } from '../../../../types'

interface OpcoesFreteProps {
    data: DeliveryOption[]
    selectedOption: string | null
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FreightOption: React.FC<OpcoesFreteProps> = ({ data, selectedOption, handleOptionChange }) => {
    return (
        <div>
            {data.slice(0, 3).map((option) => (
                <div className="mt-4 px-3" key={option.id}>
                    <div className="flex">
                        <input
                            className="bg-white"
                            type="checkbox"
                            id={`option-${option.id}`}
                            name="freightOption"
                            value={JSON.stringify(option)}
                            checked={selectedOption === option.name}
                            onChange={handleOptionChange}
                        />
                        <h1 className="font-semibold ml-2">
                            {option.id === 3 ? option.company.name : option.name}
                        </h1>
                    </div>
                    <div className="flex justify-between ml-7">
                        <div>
                            <p>Prazo:</p>
                            <p>Valor:</p>
                        </div>
                        <div>
                            <p>{option.delivery_time} dias</p>
                            <p>R$ {option.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
