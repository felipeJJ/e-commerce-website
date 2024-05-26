"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import UserInfoForm from "./userInfo/userInfoForm"
import UserAddressForm from "./userAddress/userAddressForm"
import { signUpFormSchemaAuth } from "../../schemas/signupFormSchema"
import { UserInfoDataAuth } from "../../../types"

export default function FormControlerAuth() {
    const [error, setError] = useState("")
    const [ formStep, setFormStep ] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()

    const methods = useForm({
        resolver: yupResolver(signUpFormSchemaAuth),
        mode: "all"
    })

    const {reset} = methods

    const nextStep = async () => {
        const stepFields = formStep === 0
            ? ["name", "cellphone", "cpf", "email"]
            : ["address", "state", "city", "zip", "district"]
        const isValid = await methods.trigger(stepFields as 
            (   
                "name"|"cellphone"|"cpf"|"email"|
                "address"|"state"|"city"|"zip"|"district"
            )[])
        if (isValid) {
            setFormStep((prevStep) => prevStep + 1)
        }
    }
    
    const onSubmit = async (data: UserInfoDataAuth) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post('/api/userInfoApi', { ...data }, {
                headers: {'Content-Type': 'application/json'}
            })
            if (response.status === 200 ){
                router.push('/cart')
            } else {
                renderError( response.data.message )
                reset()
            }
            setIsSubmitting(false)
        } catch (error: any) {
            setIsSubmitting(false)
            if (error.response && error.response.status === 409) {
                renderError(error.response.data.message)
            } else {
                renderError("Erro ao criar a conta, tente mais tarde")
            }
        }
    }

    function renderError(msg: string) {
        setError(msg)
        setTimeout(()=>{
            setError("")
        }, 3000)
    }
    
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)} 
                className="bg-gray-100 rounded-lg w-96 flex justify-center items-center flex-col p-10 my-24"
            >        
                <h1 className="font-bold text-3xl mb-3">CRIAR CONTA</h1>
                { formStep === 0 && (
                    <section>
                        <h2 className="font-bold text-base mb-3 translate-y-2"> Dados pessoais: </h2>
                        <UserInfoForm />
                    </section>
                )}
                { formStep === 1 && (
                    <section>
                        <h2 className="font-bold text-base mb-3 translate-y-2"> Dados do endereço: </h2>
                        <UserAddressForm />
                    </section>
                )}
                {formStep < 1 && (
                    <button type="button" onClick={nextStep} className="btn btn-neltral w-full text-lg mt-5 bg-gray-300">
                        Continuar
                    </button>
                )}
                {formStep === 1 && (
                    <>
                        <button type="submit" className="btn btn-neltral w-full text-lg mt-5 bg-gray-300">
                            {isSubmitting ? "Carregando..." : "Finalizar"}
                        </button>
                        {error && (
                            <span className="text-sm text-red-800 pl-2 mt-1">{error}</span>
                        )}
                        <div className="w-full flex gap-2">
                            <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                                <p className="text-lg translate-y-2">ou</p>
                            <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                        </div>
                        <button type="button" onClick={() => setFormStep((prevStep) => prevStep - 1)} 
                            className="btn btn-neltral w-32 text-lg mt-5 bg-gray-300"
                        >
                         Voltar   
                        </button>
                    </>
                )}
            </form>
        </FormProvider>
    )
}
