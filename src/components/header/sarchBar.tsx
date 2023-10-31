import { ChangeEvent } from 'react'
import SarchIcon from './sarchIcon'
import { useFilterContext } from '@/contexts/filterContext'

export default function SarchBar() {
    const { search, setSearch } = useFilterContext() 

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    return(
        <div className=" bg-gray-100 w-[359px] h-11 py-2 px-4 rounded-lg flex mr-5">
            <input 
                type="text" 
                value={search}
                className="outline-none bg-gray-100 w-[296px] pr-20" 
                placeholder='Procura por algo específico'
                onChange={handleSearch}
            />
            <SarchIcon/>
        </div>
)
}