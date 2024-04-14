import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login(){
    const {data: session} = useSession()

    const router = useRouter()

    function handleSignIn(){
        router.push('/signin')
    }

    function handleSignUp(){
        router.push('/signup')
    }

    return(
        <div className="text-[#737380] text-xs">
            {(!session) ? (
                <div>
                    <div className="flex pl-5 mx-3 gap-1">
                        <p>Faça</p>
                        <button className="font-semibold" onClick={handleSignIn}>LOGIN</button>
                        <p>ou</p>
                    </div>
                    <div className="flex pl-5 mx-3 gap-1">
                        <p>crie seu</p>
                        <button className="font-semibold" onClick={handleSignUp}>CADASTRO</button>
                    </div>
                </div>
            ): (
                <div className="pl-5 mx-3 gap-1">
                    <div className="text-sm">
                        <p>Olá, {session.user?.name}</p>
                    </div>
                    <button className="font-semibold pl-1" onClick={() => signOut()}>SAIR</button>
                </div>
            )}
        </div>
    )
}