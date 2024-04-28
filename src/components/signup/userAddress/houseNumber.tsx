
import { useState } from 'react';
import { useFormContext } from 'react-hook-form'

export default function HouseNumber() {
    const [formattedNumber, setformattedNumber] = useState("")

    const { register } = useFormContext()

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")

        value = value.replace(/(\d{0,3})/, "$1")
        
        setformattedNumber(value)
    }

  return (
    <label className="input input-bordered flex items-center mt-4">
        <input 
            {...register("houseNumber")}
            className="grow" 
            placeholder="Número*"
            value={formattedNumber}
            onChange={handleCpfChange}
        />
    </label>
    )
}
