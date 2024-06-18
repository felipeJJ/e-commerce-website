import CartInfo from "@/components/cart/cartInfo"
import CheckoutResume from "@/components/cart/checkout/checkoutResume"
import ProductCartCard from "@/components/cart/productCartCard"

export default function Cart() {
    return (
        <main className="flex flex-col w-full h-full xl:flex-row lg:px-40 justify-between font-serif min-h-screen px-8 2xl:px-72 pb-24 text-[#41414D]">
            <div className="flex flex-col xl:flex-row lg:space-x-8 w-full">
                <div className="flex flex-col w-full lg:w-2/3">
                    <CartInfo tituliInfo="SEU CARRINHO" />
                    <ProductCartCard />
                </div>
                <div className="w-full lg:w-1/3">
                    <CheckoutResume />
                </div>
            </div>
        </main>
    )
}
