import React from 'react'

interface InputCEPProps {
    cep: string
    onChange: (formattedCep: string) => void
    onEnterPress: () => void
}

export const InputCEP: React.FC<InputCEPProps> = ({ cep, onChange, onEnterPress }) => {
    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formattedCep = event.target.value.replace(/\D/g, '')

        if (formattedCep.length > 5) {
            formattedCep = formattedCep.replace(/^(\d{5})(\d)/, '$1-$2')
        }
        onChange(formattedCep)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnterPress()
        }
    }

    return (
        <input
            id="cep"
            className="bg-gray-50 border-2 border-gray-100 outline-gray-500 w-32 rounded-xl px-3"
            type="text"
            value={cep}
            onChange={handleCepChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite o CEP"
            maxLength={9}
        />
    )
}
