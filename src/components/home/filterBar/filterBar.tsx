import FilterCategory from "./filterCategory"
import OrganizerSelection from "./organizerSelection"
import Pagination from "./pagination"

export default function FilterBar() { 

    return (
        <>
            <section className="justify-between font-serif 
                text-[#737380] h-36 lg:flex lg:justify-between hidden"
            >
                <FilterCategory/> 
                <div className="mt-12">
                    <OrganizerSelection/>
                    <Pagination/>
                </div> 
            </section>
            <section className="font-serif text-[#737380] h-20 block lg:hidden">
                <div className="flex justify-between gap-4 ">
                    <FilterCategory/> 
                    <OrganizerSelection/>
                </div>
            </section>
        </>
    )
}