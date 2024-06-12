import {
    ReactNode,
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from "react"

interface CheckoutContextType {
    selectedCardId: string | null 
    amount: number 
    transactionStatus: string | null 
    setTransactionStatus: Dispatch < SetStateAction < string | null >>
    setAmount: Dispatch<SetStateAction<number>> 
    setSelectedCardId: Dispatch < SetStateAction < string | null >>
}

const CheckoutContext = createContext<CheckoutContextType>({
    selectedCardId: null,
    amount: 0,
    transactionStatus: null,
    setTransactionStatus: () => {},
    setAmount: () => {},
    setSelectedCardId: () => {}
})

export const useCheckoutContext = () => {
    return useContext(CheckoutContext)
}

interface ProviderProps {
    children: ReactNode
}

export function CheckoutContextProvider({children} : ProviderProps) {
    const [selectedCardId, setSelectedCardId] = useState < string | null > (null)
    const [transactionStatus, setTransactionStatus] = useState < string | null > (null)
    const [amount, setAmount] = useState(0)

    return (
        <CheckoutContext.Provider
            value={{
                selectedCardId,
                amount,
                transactionStatus, 
                setTransactionStatus,
                setAmount,
                setSelectedCardId
            }}>
            {children}
        </CheckoutContext.Provider>
    )
}
