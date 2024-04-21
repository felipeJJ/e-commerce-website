"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, FormProvider } from "react-hook-form"
import { Saira } from "next/font/google"
import { useState } from "react"
import ClosedEyeIcon from "@/components/signup/closedEyeIcon"
import OpenEyeIcon from "@/components/signup/openedEyeIcon"
import SelectEstado from "@/components/signup/stateSelect";
import SelectCidade from "@/components/signup/citySelect";
import PhoneInput from "@/components/signup/phoneNumerInput"

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '400', '500', '600'],
    variable: '--font-saira',
})

const schema = yup.object({
    name: yup.string().required("Campo obrigatório!"),
    cellphone: yup.string()
        .matches(/^\(\d{0,2}\)\s\d{0,5}-\d{0,4}$/, "Exemplo: (99) 99999-9999")
        .min(15, "Celular deve conter 11 números")
        .required("Campo obrigatório"),
    cpf: yup.string()
        .min(11,"CPF deve conter 11 números")
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve conter 11 números")
        .required("Campo obrigatório"),
    email: yup.string().email("Digite um email válido")
        .required("Campo obrigatório"),
    password: yup.string().min(6, "Senha deve conter ao menos 6 digitos")
        .required("Campo obrigatório"),  
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
        .required("Campo obrigatório"),
    address: yup.string().required("Campo obrigatório"),
    state: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Campo obrigatório"),
    zip: yup.string()
        .min(9, "CEP deve conter 8 digitos")
        .required("Campo obrigatório"),
})

export default function SignUp() {
    const [formattedCpf, setFormattedCpf] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    })
    const {register, formState: { errors }} = methods
    
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

    function handleEyeIcon(){
        if (showPassword)
            setShowPassword(false)
        else 
            setShowPassword(true)
    }
    
    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <main className={`${saira.variable} font-serif flex items-center justify-center h-screen text-gray-700 overflow-hidden`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg w-96 flex justify-center items-center flex-col p-10 ">
                    <h2 className="font-bold text-3xl mb-3">CRIAR CONTA</h2>
                    <label className="input input-bordered flex items-center mt-4">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Nome completo*"
                            {...register("name")}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                    </label>
                    {errors.name && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.name.message}</p>}
                    
                    <label className="input input-bordered flex items-center mt-4">
                        <input
                            type="email"
                            className="grow"
                            placeholder="Email*"
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                    </label>
                    {errors.email && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.email.message}</p>}
                    
                    <PhoneInput/>
                    {errors.cellphone && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.cellphone.message}</p>}
                    
                    <label className="input input-bordered flex items-center mt-4">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Número do CPF*"
                            value={formattedCpf}
                            maxLength={14} 
                            {...register("cpf")}
                            onChange={handleCpfChange}
                            aria-invalid={errors.cpf ? "true" : "false"}
                        />
                    </label>
                    {errors.cpf && <p className="text-sm text-red-800 pl-2 mt-1 " role="alert">{errors.cpf.message}</p>}
                    
                    <label className="input input-bordered flex items-center mt-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="grow"
                            placeholder="Senha*"
                            {...register("password")}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        <button type="button" onClick={handleEyeIcon}>
                            {showPassword ? <ClosedEyeIcon/> : <OpenEyeIcon/>}
                        </button>
                    </label>
                    {errors.password && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.password.message}</p>}
                    
                    <label className="input input-bordered flex items-center mt-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="grow"
                            placeholder="Confirme a senha*"
                            {...register("confirmPassword")}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                        />
                        <button type="button" onClick={handleEyeIcon}>
                            {showPassword ? <ClosedEyeIcon/> : <OpenEyeIcon/>}
                        </button>
                    </label>
                    {errors.confirmPassword && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.confirmPassword.message}</p>}
                
                    <SelectEstado />
                    {errors.state && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.state.message}</p>}
                    <SelectCidade />
                    {errors.city && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.city.message}</p>}

                    <label className="input input-bordered flex items-center mt-4">
                        <input
                        type="text"
                        className="grow"
                        placeholder="Endereço*"
                        {...register("address")}
                        aria-invalid={errors.address ? "true" : "false"}
                        />
                    </label>
                    {errors.address && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.address.message}</p>}

                    <button type="submit" className="btn btn-neltral w-full text-lg mt-5 bg-gray-300"> CONTINUAR </button>
                </form>
            </FormProvider>
        </main>
    )
}