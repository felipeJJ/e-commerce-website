import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function ZipCodeInput() {
    const [formattedZip, setFormattedZip] = useState("")

    const { register } = useFormContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let formattedZipCode = e.target.value.replace(/\D/g, '')

        if (formattedZipCode.length > 5) {
            formattedZipCode = formattedZipCode.replace(/^(\d{5})(\d)/, '$1-$2')
        }
        setFormattedZip(formattedZipCode)
    }

    return ( 
        <label className="input input-bordered flex items-center gap-2 mt-4">
            <input
                type="text"
                className="grow"
                placeholder="CEP*"
                value={formattedZip}
                maxLength={9}
                {...register("zip")}
                onChange={handleChange}
            />
        </label>            
    )
}
