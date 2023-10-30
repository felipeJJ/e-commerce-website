import FilterCategory from "./filterCategory";
import { Saira } from "next/font/google";

const saira = Saira({
    subsets: ['latin'],
    weight:['400', '600'],
    variable: '--font-saira',
})

export default function FilterBar() { 

    return (
        <section className={` ${saira.variable} font-serif text-[#737380] w-full h-36 mx-40`}>
          <FilterCategory/>  
        </section>
    )
}