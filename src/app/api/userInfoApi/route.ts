import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import database from "../../../../database/lib/mongoose"
import UserInfo from "../../../../database/schemas/userData"
import { UserInfoData } from "../../../../types"
import { getServerSession } from "next-auth"
import { handler } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
    await database.connectMongo()
    try {
        const { name, cpf, cellphone, email, password, confirmPassword,
            state, city, zip, address, houseNumber, district
        } = await req.json() as unknown  as UserInfoData

        const emailExists = await UserInfo.findOne({ email })
        if (emailExists) {
            return NextResponse.json(
                { message: "Email já existe" },
                { status: 409 },
            )
        }

        let userPayload: Partial<UserInfoData> = {
            name, cpf, cellphone, email,
            state, city, zip, address, houseNumber, district
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 5)
            userPayload = { ...userPayload, password: hashedPassword, confirmPassword: hashedPassword }
        }

        await UserInfo.create(userPayload)
        
        return NextResponse.json(
            { message: "Usuário criado com susseco!", UserInfo },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error ao salvar cadstro de usuário", error },
            { status: 500 }
        )
    } 
}

export async function GET(req: Request) {
    await database.connectMongo()

    const session = await getServerSession(handler)

    const url = new URL(req.url)
    const email = url.searchParams.get('email')

    try {
        if(session?.user?.email === email){

            const user: UserInfoData | null = await UserInfo.findOne({ email }).lean()
            if (user) {
                return NextResponse.json(
                    { message: "Usuário encontrado", user },
                    { status: 200 }
                )
            } else {
                return NextResponse.json(
                    { message: "Usuário não encontrado" },
                    { status: 404 }
                )
            }
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao buscar usuário", error },
            { status: 500 }
        )
    }
}