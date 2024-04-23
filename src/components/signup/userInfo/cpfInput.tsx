
import { useState } from 'react';
import { useFormContext } from 'react-hook-form'

export default function CpfInput() {
    const [formattedCpf, setFormattedCpf] = useState("")

    const { register } = useFormContext()

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        
        if (value.length > 3 && value.length <= 6) 
            value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2")
        else if (value.length > 6 && value.length <= 9) 
            value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3")
        else if (value.length > 9) 
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4")
        
        setFormattedCpf(value)
    }

  return (
        <label className="input input-bordered flex items-center mt-4">
            <input
                type="text"
                className="grow"
                placeholder="Número do CPF*"
                value={formattedCpf}
                maxLength={14} 
                {...register("cpf")}
                onChange={handleCpfChange}
            />
        </label>
    )
}
