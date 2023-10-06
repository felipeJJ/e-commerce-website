"use client"
import BagIcon from './bagIcon'
import CartControler from './cartControler' 
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
        <header className="w-full h-20 flex items-center justify-between px-[160px] py-5 shadow-md">
            <Logo/>
            <div className={`${saira.variable} font-serif flex items-center`}>
                <SarchBar/>
                <div className="flex">
                    <BagIcon/>
                    <CartControler/>
                </div>
            </div>

        </header>
    )
}