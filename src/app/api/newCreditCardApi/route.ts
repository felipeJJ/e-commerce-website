import crypto from "crypto"
import dotenv from "dotenv"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { creditCardData } from "../../../../types"
import { handler } from "../auth/[...nextauth]/route"
import database from "../../../../database/lib/mongoose"
import CreditCard from "../../../../database/schemas/creditCard"

dotenv.config()

function encrypt(text: string, iv: Buffer): string {
    if (!process.env.CRYPTO_SECRET_KEY) {
        throw new Error('Variável de ambiente CRYPTO_SECRET_KEY não está definida.')
    }
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY)
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return encrypted
}

export async function POST(req: Request, res: Response) { 
    const session = await getServerSession(handler)

    try {
        if(session){
            await database.connectMongo()

            const { cardNumber, cardHolderName, expirationDate, cvc, userId } = await req.json()

            const existingCard = await CreditCard.findOne({ userId, cardNumber })
            if (existingCard) {
                return NextResponse.json(
                    { message: "Já existe um cartão com este número para o usuário informado." },
                    { status: 400 }
                )
            }

            const iv = crypto.randomBytes(16)
            const ivHex = iv.toString('hex')
    
            const encryptedCardNumber = encrypt(cardNumber, iv)
            const encryptedCardHolderName = encrypt(cardHolderName, iv)
            
            const cardPayload: creditCardData = {
                cardNumber: encryptedCardNumber, 
                cardHolderName: encryptedCardHolderName,
                expirationDate,
                cvc,
                userId,
                iv: ivHex,
            }
            
            await CreditCard.create(cardPayload)
            return NextResponse.json(
                { message: "Criado com sucesso", CreditCard },
                { status: 200 }
            )
        }
    } catch (error: unknown) {
        console.error(error)
        return NextResponse.json(
            { message: "Erro ao salvar cartão de crédito", error: error instanceof Error? error.message : "Erro desconhecido" },
            { status: 500 }
        )
    }
}
