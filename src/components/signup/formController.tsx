"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import UserInfoForm from "./userInfo/userInfoForm"

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

export default function FormControler() {
    const [ formStep, setFormStep ] = useState(0)

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    })
    
    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-gray-100 rounded-lg w-96 flex justify-center items-center flex-col p-10 my-24">        
                <h1 className="font-bold text-3xl mb-3">CRIAR CONTA</h1>
                { formStep === 0 && (
                    <section>
                        <h2 className="text-base mb-3 translate-y-2"> Dados do usuário: </h2>
                        <UserInfoForm/>
                    </section>
                )}
                { formStep === 1 && (
                    <section>
                        <h2 className="text-base mb-3 translate-y-2"> Dados do usuário: </h2>
                        <UserInfoForm/>
                    </section>
                )}
                
                
                <button type="submit" className="btn btn-neltral w-full text-lg mt-5 bg-gray-300"> CONTINUAR </button>
            </form>
        </FormProvider>
    )
}