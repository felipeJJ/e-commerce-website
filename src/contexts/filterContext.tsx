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
    selectedCategoryId: '',
    setSearch: (value: string) =>{},
    setPage: (value: number) =>{},
    setCategories: (value: CategoryResponse) =>{},
    setSelectedCategoryId: (value: string) =>{},
})

export const useFilterContext = () => {
    return useContext(FilterContext);
  };

interface providerProps{
    children: ReactNode
}

export function FilterContextProvider({ children }: providerProps){
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [categories, setCategories] = useState<CategoryResponse>({
        message: '',
        category: []
      });
    const [selectedCategoryId, setSelectedCategoryId] = useState("all_products")
      
    useEffect(() => {
    axios.get('/api/getCategoriesApi').then(response =>{
        setCategories(response.data);
    })
    }, []);

    return (
        <FilterContext.Provider value={{
            search, page, categories, selectedCategoryId, 
            setSearch, setPage,setCategories, setSelectedCategoryId}}
        >
            {children}
        </FilterContext.Provider>
    )
}