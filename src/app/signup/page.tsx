"use client"

import FormController from "@/components/signup/formController"
import FormControlerAuth from "@/components/signup/formControllerAuth"
import { useSession } from "next-auth/react"

export default function SignUp() {
    const {data: session} = useSession()

    return (
        <main className="font-serif flex items-center justify-center h-full text-gray-700 overflow-hidden">
            {!session && (
                <FormController/>
            )}
            {session && (
                <FormControlerAuth/>
            )}
        </main>
    )
}