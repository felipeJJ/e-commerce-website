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
    transactionStatus: string | null
    userId: string | null
    freight: objectType
    payment: objectType
    userData: UserInfoData
    orderStatus: string | null
    setOrderStatus: Dispatch<SetStateAction<string | null>>
    setUserData: Dispatch<SetStateAction<UserInfoData>>
    setPayment: Dispatch<SetStateAction<objectType>>
    setFreight: Dispatch<SetStateAction<objectType>>
    setUserId: Dispatch<SetStateAction<string | null>>
    setTransactionStatus: Dispatch<SetStateAction<string | null>>
    setAmount: Dispatch<SetStateAction<number>>
    setSelectedCardId: Dispatch<SetStateAction<string | null>>
}

const CheckoutContext = createContext<CheckoutContextType>({
    selectedCardId: null,
    amount: 0,
    transactionStatus: null,
    userId: null,
    freight: {},
    payment: {},
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
    setPayment: () => {},
    setFreight: () => {},
    setUserId: () => {},
    setTransactionStatus: () => {},
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
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null)
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [orderStatus, setOrderStatus] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
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
    const [payment, setPayment] = useState<objectType>({})
    const [amount, setAmount] = useState(0)

    return (
        <CheckoutContext.Provider
            value={{
                selectedCardId,
                amount,
                transactionStatus,
                userId,
                freight,
                payment,
                userData,
                orderStatus,
                setOrderStatus,
                setUserData,
                setPayment,
                setFreight,
                setUserId,
                setTransactionStatus,
                setAmount,
                setSelectedCardId,
            }}>
            {children}
        </CheckoutContext.Provider>
    )
}