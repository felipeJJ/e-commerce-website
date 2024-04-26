import { useFormContext } from "react-hook-form" 
import CpfInput from "./cpfInput"
import PhoneInput from "./phoneNumerInput"
import PassWordInput from "./passWordInput"
import ConfirmPassWordInput from "./confirmPassWprdInput"

export default function UserInfoForm() {
    const { register, formState: { errors } } = useFormContext()
    
    return (
        <>
            <label className="input input-bordered flex items-center mt-4">
                <input 
                    {...register("name")}
                    className="grow" 
                    placeholder="Nome completo*"
                />
            </label>
            {errors.name && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.name.message as string}</p>}
            <CpfInput/>
            {errors.cpf && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.cpf.message as string}</p>}
            <PhoneInput/>
            {errors.cellphone && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.cellphone.message as string}</p>}
            <label className="input input-bordered flex items-center mt-4">
                <input
                    type="email"
                    className="grow"
                    placeholder="Email*"
                    {...register("email")}
                />
            </label>
            {errors.email && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.email.message as string}</p>}
            <PassWordInput/>
            {errors.password && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.password.message as string}</p>}
            <ConfirmPassWordInput/>
            {errors.confirmPassword && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.confirmPassword.message as string}</p>}
        </>
    )
}