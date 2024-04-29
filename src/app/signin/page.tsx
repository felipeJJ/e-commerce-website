"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, SignInResponse } from "next-auth/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Saira } from "next/font/google"
import EmailIcon from "@/components/signin/emailIcon"
import PasswordIcon from "@/components/signin/passwordIcon"
import GoogleIcon from "@/components/signin/googleIcon"

const schema = yup
    .object({
        email: yup.string().email('e-mail não é válido').required('Campo obrigatorio!'),
        password: yup.string().min(6, 'No minimo 6 digiotos').required('Campo obrigatorio!'),
    }).required()

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '400', '500', '600'],
    variable: '--font-saira',
})

export default function SignIn(){
    const [error, setError] = useState<string>("")
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    })

    const onSubmit = async (data: {email: string, password: string}) => {
        try {
            const result: SignInResponse | undefined = await signIn("credentials", {
                ...data,
                redirect: false,
                callbackUrl: process.env.NEXTAUTH_URL,
            })
            
            if (result && result.error) {
                renderError(result.error)
                reset();
            } else {
                router.push("/")
            }
        } catch (error) {
            renderError("Erro ao criar conta, tente mais tarde")
        }
    }

    function renderError(msg: string) {
        setError(msg)
        setTimeout(() => {
            setError("")
        }, 3000)
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
                {error && (
                            <span className="text-sm text-red-800 pl-2 mt-1">{error}</span>
                        )}
                <div className="w-full flex gap-2">
                    <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                    <p className="text-lg translate-y-2">ou</p>
                    <div className="w-2/5 h-[1px] bg-[#DCE2E5] mt-6"></div>     
                </div>
                <button 
                    type="button"
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