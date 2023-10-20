import { NextResponse } from "next/server";
import database from "../../../../database/lib/mongoose";
import Categoria from "../../../../database/schemas/categoria";

export async function GET(req: Request, res: Response) {
    await database.connectMongo();
    try {
        const category = await Categoria.find();
        return NextResponse.json(
          { message: "Ok", category },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Error trying to load the cateories", error },
          { status: 500 }
        );
      } 
     
}