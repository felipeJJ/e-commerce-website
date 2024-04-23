import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import ClosedEyeIcon from "@/components/signup/closedEyeIcon"
import OpenEyeIcon from "@/components/signup/openedEyeIcon"

export default function PassWordInput() {
    const [showPassword, setShowPassword] = useState(false)

    const { register} = useFormContext()

    function handleEyeIcon(){
        if (showPassword)
            setShowPassword(false)
        else 
            setShowPassword(true)
    }

    return ( 
        <label className="input input-bordered flex items-center mt-4">
            <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Senha*"
                {...register("password")}
            />
            <button type="button" onClick={handleEyeIcon}>
                {showPassword ? <ClosedEyeIcon/> : <OpenEyeIcon/>}
            </button>
        </label>
    )
}
