import axios from "axios"
import generateUniqueId from "generate-unique-id"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
    const { cardNumber, cardHolderName, expirationDate, cvc, amount } = await req.json()

    const orderId = generateUniqueId({
        length: 10,
        useLetters: false,
        useNumbers: true,
    })

    try {
        const response = await axios.post(
            "https://apisandbox.cieloecommerce.cielo.com.br/1/sales",
            {
                "MerchantOrderId": orderId,
                "Payment": {
                    "Type": "CreditCard",
                    "Amount": amount,
                    "Installments": 1,
                    "SoftDescriptor": "123456789ABCD",
                    "CreditCard": {
                        "CardNumber": cardNumber,
                        "Holder": cardHolderName,
                        "ExpirationDate": expirationDate,
                        "SecurityCode": cvc,
                        "Brand": "Visa"
                    }
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    MerchantId: process.env.MERCHANT_ID,
                    MerchantKey: process.env.MERCHANT_KEY,
                }
            }
        )
        return NextResponse.json(
            { message: "OK", response: response.data },
            { status: 200 }
        )
    } catch (error: unknown) {
        let errorMessage = "Erro desconhecido"

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = error.response.data
            } else if (error.request) {
                errorMessage = "Nenhuma resposta recebida da API terceira"
            } else {
                errorMessage = error.message
            }
        } else if (error instanceof Error) {
            errorMessage = error.message
        }

        return NextResponse.json(
            { message: "Erro ao solicitar pagamento", error: errorMessage },
            { status: 500 }
        )
    }
}
