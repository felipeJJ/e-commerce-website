import CartInfo from "@/components/cart/cartInfo"
import CheckoutResume from "@/components/cart/checkout/checkoutResume"
import CreditCardCard from "@/components/checkout/creditCardCard"
import DeliveryAddressCard from "@/components/checkout/deliveryAddressCard"

export default function Checkout() {
    return (
        <main className="flex flex-col lg:flex-row justify-between font-serif w-full min-h-screen h-full px-4
            md:px-20 lg:px-40 2xl:px-72 pb-24 text-[#41414D] space-y-8 lg:space-y-0 lg:space-x-8"
        >
            <section className="w-full lg:w-3/5 h-full sm:px-20 px-10 lg:px-0">
                <CartInfo tituliInfo="FINALIZAR COMPRA" />
                <DeliveryAddressCard />
                <CreditCardCard />
            </section>
            <section className="w-full lg:w-2/5 h-full flex justify-center">
                <CheckoutResume />
            </section>
        </main>
    )
}
