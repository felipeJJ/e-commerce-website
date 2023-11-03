import { ChangeEvent } from 'react'
import SarchIcon from './sarchIcon'
import { useFilterContext } from '@/contexts/filterContext'

export default function SarchBar() {
    const { search, setSearch } = useFilterContext() 

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    return(
        <div className="flex bg-gray-100 h-11 w-52 py-2 px-3 rounded-lg sm:w-[359px]">
            <input 
                type="text" 
                value={search}
                className="outline-none bg-gray-100 w-[296px] pr-20 hidden sm:block" 
                placeholder='Procura por algo específico'
                onChange={handleSearch}
            />
            <input 
                type="text" 
                value={search}
                className="outline-none bg-gray-100 w-40 sm:hidden" 
                placeholder='pesquise'
                onChange={handleSearch}
            />
            <SarchIcon/>
        </div>
    )
}