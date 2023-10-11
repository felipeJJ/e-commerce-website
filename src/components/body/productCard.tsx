import { Products } from "../../../types";
import Image from "next/image";
import Line from "./lineDivider";
import { Saira } from 'next/font/google'

const saira = Saira({
    subsets: ['latin'],
    weight:['300', '600'],
    variable: '--font-saira',

})

interface ProductCardProps {
    products: Products[];
  }

export default function ProductCard({ products }: ProductCardProps) {
    return(
        <>
            {products.map((product) => (
                <section key={product._id} className="w-64 h-[408px] shadow-lg">
                    <div className="w-64 h-[300px] relative boder-2 border-red-300">
                        <Image
                            fill
                            src={product.imagens[1]}
                            alt="Product image"
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 300px) 100vw"

                        />
                    </div>
                    <div className={`${saira.variable} font-serif w-64 absolute`}>
                        <div className=" flex justify-center mt-1">
                            <Line/>
                        </div>
                        <p className=" my-2 mx-3 font-light">
                            {product.nome}
                        </p>
                        <div className=" flex justify-center">
                            <Line/>
                        </div>
                        <p className=" my-2 mx-3 font-semibold">
                            {`R$ ${product.preco},00`}
                        </p>
                    </div>
                </section>
            ))}
        </>
    )
}