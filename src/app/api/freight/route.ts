import { NextResponse } from "next/server"

interface PackageDetails {
    height: number;
    width: number;
    length: number;
    weight: number;
}
   
interface ShipmentRequest {
from: { postal_code: string };
to: { postal_code: string };
package: PackageDetails;
}

export async function POST(req:any) {
    try {
        const { from, to, package: packageDetails } = await req.json()

        const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiJmYmQwNmVkZThkMGYzNjMxZDY4YmJlNjczZjYyMWFmZTdmNTg3YmUxMGNlZTA5NTQ3NjVlNmViNzU2YzBmNjVkYjUyYWU4N2UzMGVlMzdlYiIsImlhdCI6MTcxNDYwNTM3MS4wNzExODUsIm5iZiI6MTcxNDYwNTM3MS4wNzExODksImV4cCI6MTc0NjE0MTM3MS4wNTI5ODgsInN1YiI6IjlhOWI1NjE4LWVkMjYtNDM5NS1iMjMwLTEyODU1NTZmMTE1MiIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy10cmFja2luZyJdfQ.WN_Ule4owCpAZNA3BVUzlSFyZNrJ5Ml0lWxPt3VdLxUgrXDOTOKKpQ29xGt9iiBmBXYuES6OS2t7vN5zcJtME5gEyPfptrHBLTwIOKo233yLUgo7v--nnni9-YREjB_3c7XUIe3M_r8dzrWE_7WXeSaE68BZwqfRNyAJYnrXUr6wQH7RS-1ER2llyujXYlpUiIPx0pYrdb4IUDiW9lxXkOKOM079xJiFZhTIISB5VzNQUANDXAtcLjeudUnl7xa7N2WLC9JNYoBWkLa4a9OREcKJOByZEjugLl729l3xsqXmX9oMWgy4TJfVLsQncfwFHImLQFJk8-6NyI8UPOEKidbrQ7sXU9Tb3ZuuNJFrRKyHzvKecnqh3O8_LzJUnK7MrK2G6b6tFJraFtocw2iEJ0Ulyvp9XX6cZB7NNiVIVmxwHWbWkPCW21rQxA3JXkpTSmeMg1YxiiICPXYhhavRqAlV5Ii7eKqu7bQzeAy9i9dIjWHFfoYqyP5-8yd9QADx1IYH3CF9Ni2U9OZ8a2WEbzFjVmEvYlYqYBpQ4xnlYQMPIjA37UhJAe3uM9X9eMprW7sx4zsLRE_lXFi0Xc6SDLADL0ibgq_fZEpVX13_4HLCi3la2awOZKy4WEDwqty7jsj7Qb1uX8M56-jDgSy_KQlMHuEsNq-Fb_A9aaJkEwc',
                'User-Agent': 'Aplicação jorge@gmail.com'
            },
            body: JSON.stringify({
                from: {postal_code: from.postal_code},
                to: {postal_code: to.postal_code},
                package: {height: packageDetails.height, width: packageDetails.width, length: packageDetails.length, weight: packageDetails.weight}
            })
        })
        
        const data = await response.json()
        return(
            NextResponse.json(
                { message: "OK", data},
                { status: 200 }
            )
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao consultar frete", error },
            { status: 500 }
        )
    }
}