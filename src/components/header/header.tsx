"use client"

import { useRouter } from "next/navigation"
import BagIcon from './bagIcon'
import CartControler from './cartController' 
import Logo from './logo'
import SarchBar from './sarchBar'
import Login from "./login"

export default function Header() {
    const router = useRouter()
    
    function handleCart(){
        router.push('/cart')
    }
    return (
        <header className="flex flex-col md:flex-row w-full h-auto md:h-20 mb-1 py-5 items-center justify-between 
            md:px-[160px] shadow-md space-y-4 md:space-y-0"
        >
            <Logo />
            <div className="flex flex-row w-full justify-between font-serif items-center md:px-8 px-2 space-y-4 md:space-y-0 md:space-x-4">
                <SarchBar />
                <Login />
                <button onClick={handleCart} className="flex ml-1 mr-3 sm:ml-4">
                    <BagIcon />
                    <CartControler />
                </button>
            </div>
        </header>
    )
}