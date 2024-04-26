"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import UserInfoForm from "./userInfo/userInfoForm"
import UserAddressForm from "./userAddress/userAddressForm"
import { signUpFormSchema } from "../../schemas/signupFormSchema"

export default function FormControler() {
    const [ formStep, setFormStep ] = useState(1)

    const methods = useForm({
        resolver: yupResolver(signUpFormSchema),
        mode: "all",
    })

    const nextStep = async () => {
        const stepFields = formStep === 0
            ? ["name", "cellphone", "cpf", "email", "password", "confirmPassword"]
            : ["address", "state", "city", "zip"]
        const isValid = await methods.trigger(stepFields as 
            ("name"|"cellphone"|"cpf"|"email"|"password"|"confirmPassword"|"address"|"state"|"city"|"zip")[])
        if (isValid) {
            setFormStep((prevStep) => prevStep + 1)
        }
    }
    
    const onSubmit = (data: any) => {
        console.log("asdasd", data)
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
                            Finalizar
                        </button>
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