import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import database from "../../../../database/lib/mongoose"
import UserInfo from "../../../../database/schemas/userData"
import { UserInfoData } from "../../../../types"


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
        const hashedPassword = await bcrypt.hash(password, 5)
        await UserInfo.create({
            name, cpf, cellphone, email, password:hashedPassword, confirmPassword:hashedPassword, 
            state, city, zip, address, houseNumber, district
        })
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