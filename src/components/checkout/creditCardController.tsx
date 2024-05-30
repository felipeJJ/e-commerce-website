import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { creditCardSchema } from "@/schemas/signupFormSchema"
import CreditCardForm from "./creditCardForm"
import { creditCardData } from "../../../types"
import axios from "axios"

export default function CreditCardController() {

    const methods = useForm({
        resolver: yupResolver(creditCardSchema),
        mode: "all"
    })

    const onSubmit = async (data: creditCardData) => {
        try {
            const userDataString = sessionStorage.getItem('userData')
            if (!userDataString) throw new Error('usuário não encontrado')
            const userData = JSON.parse(userDataString)
            const userId = userData._id

            const requestData = { ...data, userId }

            const response = await axios.post("/api/newCreditCardApi", requestData, {
                headers: {'Content-Type': 'application/json'}
            })

        } catch (error) {
            console.error("Error while submitting credit card data:", error)
        }
    }
    
    return(
        <FormProvider {...methods}>
            <form 
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <CreditCardForm/>
                <button className="btn btn-success w-2/4 mt-6 mx-auto" type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}
