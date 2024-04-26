import FormController from "@/components/signup/formController"
import { Saira } from "next/font/google"

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '400', '500', '600'],
    variable: '--font-saira',
})

export default function SignUp() {

    return (
        <main className={`${saira.variable} font-serif flex items-center justify-center h-full text-gray-700 overflow-hidden`}>
            <FormController/>
        </main>
    )
}