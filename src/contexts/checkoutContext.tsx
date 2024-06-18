import {
    ReactNode,
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction
} from "react"
import { UserInfoData } from "../../types"

interface objectType {
    [key: string]: any
}

interface CheckoutContextType {
    selectedCardId: string | null
    amount: number
    freight: objectType
    userData: UserInfoData
    orderStatus: string | null
    setOrderStatus: Dispatch<SetStateAction<string | null>>
    setUserData: Dispatch<SetStateAction<UserInfoData>>
    setFreight: Dispatch<SetStateAction<objectType>>
    setAmount: Dispatch<SetStateAction<number>>
    setSelectedCardId: Dispatch<SetStateAction<string | null>>
}

const CheckoutContext = createContext<CheckoutContextType>({
    selectedCardId: null,
    amount: 0,
    freight: {},
    userData: {
        name: "",
        cpf: "",
        cellphone: "",
        email: "",
        password: "",
        confirmPassword: "",
        state: "",
        city: "",
        zip: "",
        address: "",
        houseNumber: "",
        district: ""
    },
    orderStatus: "Pendente",
    setOrderStatus: () => {},
    setUserData: () => {},
    setFreight: () => {},
    setAmount: () => {},
    setSelectedCardId: () => {},
})

export const useCheckoutContext = () => {
    return useContext(CheckoutContext)
}

interface ProviderProps {
    children: ReactNode
}

export function CheckoutContextProvider({ children }: ProviderProps) {
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [orderStatus, setOrderStatus] = useState<string | null>("Pendente")
    const [userData, setUserData] = useState<UserInfoData>({
        name: "",
        cpf: "",
        cellphone: "",
        email: "",
        password: "",
        confirmPassword: "",
        state: "",
        city: "",
        zip: "",
        address: "",
        houseNumber: "",
        district: ""
    })
    const [freight, setFreight] = useState<objectType>({})
    const [amount, setAmount] = useState(0)

    return (
        <CheckoutContext.Provider
            value={{
                selectedCardId,
                amount,
                freight,
                userData,
                orderStatus,
                setOrderStatus,
                setUserData,
                setFreight,
                setAmount,
                setSelectedCardId,
            }}>
            {children}
        </CheckoutContext.Provider>
    )
}