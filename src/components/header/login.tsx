import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    function handleSignIn() {
        router.push('/signin')
    }

    function handleSignUp() {
        router.push('/signup')
    }

    return (
        <div className="text-[#737380] text-xs flex flex-col items-center md:items-start">
            {(!session) ? (
                <>
                    <div className="flex gap-1">
                        <p>Faça</p>
                        <button className="font-semibold" onClick={handleSignIn}>LOGIN</button>
                        <p>ou</p>
                    </div>
                    <div className="flex gap-1">
                        <p>crie seu</p>
                        <button className="font-semibold" onClick={handleSignUp}>CADASTRO</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-sm">
                        <p>Olá, {session.user?.name}</p>
                    </div>
                    <button className="font-semibold" onClick={() => signOut()}>SAIR</button>
                </>
            )}
        </div>
    )
}