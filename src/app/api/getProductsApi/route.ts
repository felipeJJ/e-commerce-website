import { NextResponse } from "next/server";
import database from "../../../../database/lib/mongoose";
import Produto from "../../../../database/schemas/produto";


export async function GET(req: Request, res: Response) {
    await database.connectMongo();
    try {
      const produtos = await Produto.find();
      return NextResponse.json(
        { message: "Ok", produtos },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error trying to load the products", error },
        { status: 500 }
      );
    } finally {
      database.disconnectMongo();
    }
  }
  
