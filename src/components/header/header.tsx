"use client"
import BagIcon from './bagIcon'
import CartControler from './cartController' 
import Logo from './logo'
import SarchBar from './sarchBar'
import { Saira } from 'next/font/google'

const saira = Saira({
    subsets: ['latin'],
    weight:['400'],
    variable: '--font-saira',

})

export default function Header() {

    return(
        <header className=" flex w-full h-20 mb-1 py-5 items-center justify-between 
            md:px-[160px] shadow-md"
        >
            <Logo/>
            <div className={`${saira.variable} font-serif flex items-center`}>
                <SarchBar/>
                <div className="flex ml-1 mr-3 sm:ml-4">
                    <BagIcon/>
                    <CartControler/>
                </div>
            </div>
        </header>
    )
}