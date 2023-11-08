import CartInfo from "@/components/cart/cartInfo"
import ProductCartCard from "@/components/cart/productCartCard"
import { Saira } from "next/font/google"

const saira = Saira({
    subsets: ['latin'],
    weight:['300','400', '500', '600'],
    variable: '--font-saira',
})

export default function Cart() {

    return(
        <main className={`${saira.variable} font-serif w-full h-full px-40`}>
            <CartInfo/>
            <ProductCartCard/>
        </main>
    )
}
