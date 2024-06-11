'use client'

import { useEffect, useState } from 'react'
import { UserAddress, UserInfoDataAuth } from '../../../types'
import { changeAddressSchema } from '@/schemas/signupFormSchema'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import UserAddressForm from '../signup/userAddress/userAddressForm'
import axios from 'axios'

export default function DeliveryAddressCard() {
    const [userData, setUserData] = useState<UserInfoDataAuth>({
        name: '', cpf: '', cellphone: '', email: '', state: '',
        city: '', zip: '', address: '', houseNumber: '', district: ''
    })
    const [ error, setError ] = useState("")
    const [ success, setSuccess ] = useState(false)

    const methods = useForm({
        resolver: yupResolver(changeAddressSchema),
        mode: "all"
    })

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData')
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData))
        }
    }, [])

    const onSubmit = async (data: UserAddress) => {
        (document.getElementById('my_modal_5') as HTMLDialogElement).close()
        try {
            const response = await axios.put('/api/userInfoApi', { email: userData.email, ...data }, {
                headers: {'Content-Type': 'application/json'}
            })
            if (response.status === 200 ){
                setUserData((prev) => ({
                    ...prev,
                    ...data,
                }))
                setSuccess(true)
                setTimeout(()=>{
                    setSuccess(false)
                }, 3000)
            } else {
                renderError( response.data.message )
            }
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                renderError(error.response.data.message)
            } else {
                renderError("Erro ao alterar seu endereço, por favor tente mais tarde")
            }
        }
    }

    function renderError(msg: string) {
        setError(msg)
        setTimeout(()=>{
            setError("")
        }, 6000)
    }
    
    return (
        <div className="mt-6 bg-gray-50 rounded-xl shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between h-fit w-full p-6">
                <div className="flex font-medium text-lg">
                    <h2 className="mr-10">1</h2>
                    <h2>ENDEREÇO DE ENTREGA</h2>
                </div>
                <div className="flex-1 mb-2 lg:mb-0">
                    <div className="flex flex-col ml-12 pt-1">
                        <p>{userData.name}</p>
                        <div className="flex flex-wrap">
                            <p className="mr-1">{userData.address}</p>
                            <p>{userData.houseNumber}</p>
                        </div>
                        <div className="flex flex-wrap">
                            <p>{userData.city}</p>
                            <p>, {userData.state}</p> 
                            <p className="ml-1">{userData.zip}</p>   
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-ghost text-gray-700"
                        onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}
                    >
                        Alterar
                    </button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="modal-action items-center flex-col">
                                <FormProvider {...methods}>
                                    <form method="dialog"
                                        onSubmit={methods.handleSubmit(onSubmit)}
                                        className="flex flex-col align-middle"
                                    >
                                        <h2 className="font-bold text-2xl mb-2"> Atualize o endereço </h2>
                                        <UserAddressForm />
                                        <button type="submit" className="btn btn-success mt-8 mb-8">Salvar</button>
                                    </form>
                                </FormProvider>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            {success && (
                <div role="alert" className="alert alert-success h-8 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" strokeWidth="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Enderço salvo com sucesso</span>
                </div>
            )}
            {error && (
                <div role="alert" className="alert alert-error h-8 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                    >   
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" strokeWidth="2" 
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}                          
        </div>
    )
}
