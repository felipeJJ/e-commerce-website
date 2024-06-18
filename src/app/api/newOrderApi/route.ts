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

            const newOrder = {
                userId,
                products,
                freight,
                payment,
                status,
                shippingAddress
            }
            await PurchaseOrders.create(newOrder).catch(error => {
                throw new Error('Erro ao registrar nova compra!')
            })
            return NextResponse.json(
                { message: "Usuário criado com susseco!",  },
                { status: 200 }
            )
        }
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}