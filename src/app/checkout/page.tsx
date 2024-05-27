import CartInfo from "@/components/cart/cartInfo"
import CheckoutResume from "@/components/cart/checkout/checkoutResume"
import DeliveryAddressCard from "@/components/checkout/deliveryAddressCard"

export default function Checkout() {
    return (
        <main
            className="flex justify-between font-serif w-full min-h-screen h-full
            px-40 2xl:px-72 pb-24 text-[#41414D]"
        >
            <section className="w-3/5 h-full">
                <CartInfo tituliInfo="FINALIZAR COMPRA"/>
                <DeliveryAddressCard/>
            </section>
            <section className="w-2/5 h-full flex justify-end">
            <CheckoutResume/>

            </section>

        </main>
    )
}
