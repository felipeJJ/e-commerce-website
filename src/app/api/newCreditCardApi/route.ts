import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { creditCardData } from "../../../../types"
import database from "../../../../database/lib/mongoose"
import CreditCard from "../../../../database/schemas/creditCard"

export async function POST(req: Request, res: Response) {
    await database.connectMongo()
    
    try {
        const { cardNumber, cardHolderName, expirationDate, cvc, userId } = await req.json()

        let cadrPayload: creditCardData = { cardNumber, cardHolderName, expirationDate, cvc, userId }

        const hashedCardNumber = await bcrypt.hash(cardNumber, 5)
        const hashedCardHolderName = await bcrypt.hash(cardHolderName, 5)
        
        cadrPayload = { ...cadrPayload, cardNumber: hashedCardNumber, cardHolderName: hashedCardHolderName}
        
        await CreditCard.create(cadrPayload)

        return NextResponse.json(
            { message: "Criado com sucesso", CreditCard },
            { status: 200 }
        )
    } catch (error: unknown) {
        return NextResponse.json(
            { message: "Erro ao salvar cartão de créidito", error },
            { status: 500 }
        )
    }
}
