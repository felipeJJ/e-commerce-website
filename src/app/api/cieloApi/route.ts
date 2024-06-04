import crypto from "crypto"
import dotenv from "dotenv"
import axios from "axios"
import generateUniqueId from "generate-unique-id"
import { NextResponse } from "next/server"
import database from "../../../../database/lib/mongoose"
import CreditCard from "../../../../database/schemas/creditCard"
import { creditCardData } from "../../../../types"

dotenv.config()

export async function POST(req: Request, res: Response) {
    const { userId, cardId ,amount } = await req.json()

    const orderId = generateUniqueId({
        length: 10,
        useLetters: false,
        useNumbers: true,
    })

    try {
        const cardData = await getCardData(userId, cardId)

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
                        "CardNumber": cardData.cardNumber,
                        "Holder": cardData.cardHolderName,
                        "ExpirationDate": cardData.expirationDate,
                        "SecurityCode": cardData.cvc,
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

function decrypt(encryptedText: string, iv: Buffer): string {
    if (!process.env.CRYPTO_SECRET_KEY) {
        throw new Error('Variável de ambiente CRYPTO_SECRET_KEY não está definida.')
    }
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY)
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

export async function getCardData(userId: string, cardId: string): Promise<creditCardData> {
    await database.connectMongo()

    const creditCard = await CreditCard.findOne({ _id: cardId, userId })
    if (!creditCard) {
        throw new Error('Cartão de crédito não encontrado.')
    }

    const ivBuffer = Buffer.from(creditCard.iv, 'hex')
    const decryptedCardNumber = decrypt(creditCard.cardNumber, ivBuffer)
    const decryptedCardHolderName = decrypt(creditCard.cardHolderName, ivBuffer)

    return {
        cardNumber: decryptedCardNumber,
        expirationDate: creditCard.expirationDate,
        cvc: creditCard.cvc,
        cardHolderName: decryptedCardHolderName,
    }
}