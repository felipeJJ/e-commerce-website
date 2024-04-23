import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function PhoneInput() {
    const [formattedCellphone, setFormattedCellphone] = useState("")

    const { register } = useFormContext()

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length > 2 && value.length <= 7) 
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
        else if (value.length > 7) 
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
        setFormattedCellphone(value)
    }

    return ( 
        <label className="input input-bordered flex items-center gap-2 mt-4">
            <input
                type="text"
                className="grow"
                placeholder="Número de celular*"
                value={formattedCellphone}
                maxLength={15}
                {...register("cellphone")}
                onChange={handlePhoneChange}
            />
        </label>            
    )
}
