import FilterCategory from "./filterCategory";
import OrganizerSelection from "./organizerSelection";
import Pagination from "./pagination";
import { Saira } from "next/font/google";

const saira = Saira({
    subsets: ['latin'],
    weight:['400', '600'],
    variable: '--font-saira',
})

export default function FilterBar() { 

    return (
        <section className={` ${saira.variable} flex justify-between font-serif text-[#737380] h-36 mx-40`}>
            <FilterCategory/> 
            <div className=" mt-12">
                <OrganizerSelection/>
                <Pagination/>
            </div> 
        </section>
    )
}