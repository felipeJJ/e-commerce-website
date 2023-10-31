import { createContext, useContext, useState, ReactNode } from 'react';

const OrganizerContext = createContext({
    organizer: '',
    setOrganizer: (value: string) =>{},
});

export const useOrganizerContext = () => {
    return useContext(OrganizerContext);
}

interface providerProps{
    children: ReactNode
}

export function OriganizerContextProvider({ children }: providerProps) {
    const [organizer, setOrganizer] = useState('')

    return (
        <OrganizerContext.Provider value={{
            organizer, setOrganizer
            }}
        >
            {children}
        </OrganizerContext.Provider>
    );
}
