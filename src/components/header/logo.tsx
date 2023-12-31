import { Saira_Stencil_One } from 'next/font/google'

const sairaStencil = Saira_Stencil_One({
    weight:['400'],
    subsets: ['latin'],
    variable: '--font-saira-stencil',
  })

export default function Logo() {

    return(
        <div className={`${sairaStencil.variable} h-full w-[544px]`}>
            <a href='/' className="font-sans text-5xl leading-8 tracking-widest text-gray-700">store</a>
        </div>
    )
}

    