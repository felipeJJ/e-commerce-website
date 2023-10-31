import { createContext, useContext, useState, ReactNode } from 'react';

const OrganizerContext = createContext({
    organizer: '',
    productCount: 0,
    itemsPerPage: 0,
    setOrganizer: (value: string) =>{},
    setProductCount: (value: number) =>{},
    setItemsPerPage: (value: number) =>{},

});

export const useOrganizerContext = () => {
    return useContext(OrganizerContext);
}

interface providerProps{
    children: ReactNode
}

export function OriganizerContextProvider({ children }: providerProps) {
    const [organizer, setOrganizer] = useState('')
    const [productCount, setProductCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(16)

    return (
        <OrganizerContext.Provider value={{
            organizer, productCount, itemsPerPage, setItemsPerPage, setProductCount, setOrganizer
            }}
        >
            {children}
        </OrganizerContext.Provider>
    );
}
