import { getServerSession } from "next-auth"
import { handler } from "../auth/[...nextauth]/route"
import database from "../../../../database/lib/mongoose"
import { NextResponse } from "next/server"
import PurchaseOrders from "../../../../database/schemas/newOrder"

export async function POST(req: Request, res: Response){
    const session = await getServerSession(handler)

    try {
        if(session){
            await database.connectMongo()

            const { userId, products, freight, payment, status, shippingAddress } = await req.json()

            await PurchaseOrders.create(userId, products, freight, payment, status, shippingAddress)

            return NextResponse.json(
                { message: "Usuário criado com susseco!",  },
                { status: 200 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao registrar nova compra!", error },
            { status: 500 }
        )
    }
}