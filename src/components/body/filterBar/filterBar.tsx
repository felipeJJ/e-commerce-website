import FilterCategory from "./filterCategory"
import OrganizerSelection from "./organizerSelection"
import Pagination from "./pagination"
import { Saira } from "next/font/google"

const saira = Saira({
    subsets: ['latin'],
    weight:['400', '600'],
    variable: '--font-saira',
})

export default function FilterBar() { 

    return (
        <>
            <section className={` ${saira.variable} justify-between font-serif 
                text-[#737380] h-36 lg:flex lg:justify-between hidden`}
            >
                <FilterCategory/> 
                <div className="mt-12">
                    <OrganizerSelection/>
                    <Pagination/>
                </div> 
            </section>
            <section className={`
                ${saira.variable} font-serif text-[#737380] h-20 
                block lg:hidden `}
            >
                <div className="flex justify-between ">
                    <FilterCategory/> 
                    <OrganizerSelection/>
                </div>
            </section>
        </>
    )
}