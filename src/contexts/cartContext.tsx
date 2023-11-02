import { createContext, useContext, useState, ReactNode } from 'react';

const cartContext = createContext({
    organizer: '',
    setItemsPerPage: (value: number) =>{},

});

export const usecartContext = () => {
    return useContext(cartContext);
}

interface providerProps{
    children: ReactNode
}

export function cartContextProvider({ children }: providerProps) {
    const [organizer, setOrganizer] = useState('')

    return (
        <cartContext.Provider value={{}}
        >
            {children}
        </cartContext.Provider>
    );
}
