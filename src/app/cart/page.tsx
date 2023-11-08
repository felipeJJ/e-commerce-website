import CartInfo from "@/components/cart/cartInfo"
import CheckoutResume from "@/components/cart/checkoutResume"
import ProductCartCard from "@/components/cart/productCartCard"
import { Saira } from "next/font/google"

const saira = Saira({
    subsets: ['latin'],
    weight:['300','400', '500', '600'],
    variable: '--font-saira',
})

export default function Cart() {

    return(
        <main className={`${saira.variable} flex justify-between font-serif w-full h-full 
            px-40 2xl:px-72 pb-24 text-[#41414D]`}
        >
            <div>
                <CartInfo/>
                <ProductCartCard/>
            </div>
            <div>
                <CheckoutResume/>
            </div>
        </main>
    )
}
