import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CategoryResponse } from "../../types";
import axios from "axios";

const FilterContext = createContext ({
    search: '',
    page: 0,
    categories: {
        message: '',
        category: []
      } as CategoryResponse,
    setSearch: (value: string) =>{},
    setPage: (value: number) =>{},
    setCategories: (value: CategoryResponse) =>{}

})

export const useFilterContext = () => {
    return useContext(FilterContext);
  };

interface providerProps{
    children: ReactNode
}

export function FilterContextProvider({ children }: providerProps){
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [categories, setCategories] = useState<CategoryResponse>({
        message: '',
        category: []
      });
      
    useEffect(() => {
    axios.get('/api/getCategoriesApi').then(response =>{
        setCategories(response.data);
    })
    }, []);

    return (
        <FilterContext.Provider value={{search, page, categories, setSearch, setPage,setCategories}}>
            {children}
        </FilterContext.Provider>
    )
}