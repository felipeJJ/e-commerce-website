"use client"

import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Saira } from "next/font/google"
import EmailIcon from "@/components/login/emailIcon"
import PasswordIcon from "@/components/login/passwordIcon"
import GoogleIcon from "@/components/login/googleIcon"

const schema = yup
    .object({
        email: yup.string().email('e-mail não é válido').required('Campo obrigatorio!'),
        password: yup.string().min(6, 'No minimo 6 digiotos').required('Campo obrigatorio!'),
    })
    .required()

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '400', '500', '600'],
    variable: '--font-saira',
})

export default function SignIn(){
    const {data: session} = useSession()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = async (data: any) => {

        signIn("credentials", {
          ...data,
          callbackUrl: '/',
        })
    }

    return(
        <main className={`${saira.variable} font-serif flex items-center justify-center h-screen  text-gray-700`}>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-100 py-20 p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-4'>
                <h2 className='font-bold text-3xl mb-3 '>Faça seu login</h2>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <EmailIcon/>
                        <input 
                            type="text"    
                            className="grow" 
                            placeholder="Email" 
                            {...register("email")} aria-invalid={errors.email ? "true" : "false"} 
                        />
                    </label>
                    {errors.email && <p className="text-sm text-red-800 pl-2 mt-2" role="alert">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="input input-bordered min-w-max flex items-center gap-2">
                        <PasswordIcon/>
                        <input 
                            type="password" 
                            className="grow" 
                            placeholder='Senha' 
                            {...register("password")} 
                            aria-invalid={errors.password ? "true" : "false"} 
                        />
                    </label>
                    {errors.password && <p className="text-sm text-red-800 pl-2 mt-2" role="alert">{errors.password.message}</p>}
                </div>
                <button type="submit" className="btn btn-neltral w-full text-lg mt-5 bg-gray-300"> Entrar </button>
                <div className="w-full flex gap-2">
                    <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                    <p className="text-lg translate-y-2">ou</p>
                    <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                </div>
                <button 
                    onClick={() => signIn("google", {callbackUrl: "/"})}
                    className="flex mr-4 rounded-lg bg-gray-300 w-38 min-h-fit p-4 gap-4 mt-4"
                >
                        <div className="w-8 h-8">
                            <GoogleIcon/>
                        </div>
                        <p className="text-sm translate-y-2">Entrar com Google </p>
                </button>
            </form>
        </main>
    )
}