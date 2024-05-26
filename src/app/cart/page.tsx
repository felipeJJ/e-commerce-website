import CartInfo from "@/components/cart/cartInfo"
import CheckoutResume from "@/components/cart/checkout/checkoutResume"
import ProductCartCard from "@/components/cart/productCartCard"

export default function Cart() {

    return(
        <main className="flex justify-between font-serif w-full min-h-screen h-full 
            px-40 2xl:px-72 pb-24 text-[#41414D]"
        >
            <div>
                <CartInfo tituliInfo="SEU CARRINHO"/>
                <ProductCartCard/>
            </div>
            <div>
                <CheckoutResume/>
            </div>
        </main>
    )
}