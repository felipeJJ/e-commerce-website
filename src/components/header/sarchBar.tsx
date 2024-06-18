import { ChangeEvent } from 'react'
import SarchIcon from './sarchIcon'
import { useFilterContext } from '@/contexts/filterContext'

export default function SarchBar() {
    const { search, setSearch } = useFilterContext() 

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    return (
        <div className="flex bg-gray-100 h-11 w-40 sm:w-80 md:w-96 lg:w-[359px] py-2 px-3 rounded-lg">
            <input
                name="search-bar"
                type="text"
                value={search}
                className="outline-none bg-gray-100 w-full sm:pr-20 pr-4"
                placeholder={'Procura por algo específico'}
                onChange={handleSearch}
            />
            <SarchIcon />
        </div>
    )
}