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
    return(
        <header className="flex w-full h-20 mb-1 py-5 items-center justify-between 
            md:px-[160px] shadow-md"
        >
            <Logo/>
            <div className=" font-serif flex items-center">
                <SarchBar/>
                <Login/>
                <button onClick={handleCart} className="flex ml-1 mr-3 sm:ml-4">
                    <BagIcon/>
                    <CartControler/>
                </button>
            </div>
        </header>
    )
}