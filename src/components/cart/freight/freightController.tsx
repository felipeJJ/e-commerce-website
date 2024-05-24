import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SetStateAction, useState } from 'react'
import { useCartContext } from '@/contexts/cartContext'
import { DeliveryOption } from '../../../../types'
import { FreightButton } from './freightButton'
import { FreightOption } from './freightOption'
import { InputCEP } from './InputCep'

export default function FreightController() {

    const { count, setFreightValue } = useCartContext()
    const [ cep, setCep ] = useState('')
    const [ hideInfo, setHideInfo ] = useState(true)
    const [ isAnimating, setIsAnimating ] = useState(false)
    const [ data, setData ] = useState<DeliveryOption[]>([])
    const [ selectedOption, setSelectedOption ] = useState<string | null>(null)

    const handleCepChange = (formattedCep: SetStateAction<string>) => {
        setCep(formattedCep)
    }

    const MySwal = withReactContent(Swal)

    const handleSubmit = async () => {
        const formattedCep = cep.replace(/\D/g, '')
        
        if (formattedCep.length >= 8) {
            setIsAnimating(true)

            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        from: {postal_code: '27060370'},
                        to: {postal_code: formattedCep},
                        package: {height: count * 5, width: count * 10, length: count * 10, weight: count * 0.8}
                    })
                }
    
                const response = await fetch('/api/freight', options)
                const responseData = await response.json()
                
                if(response.status != 200){
                    MySwal.fire({
                        title: "Error!",
                        text: `Erro ao calcular o frete, tente novamente mais tarde`,
                        width: 300,
                    })
                }

                setData(responseData.data)
                setHideInfo(false)

                setTimeout(() => {
                    setIsAnimating(false)
                }, 1000)

            } catch (error) {
                console.error("Erro ao calcular o frete:", error)
                setIsAnimating(false)
            }            
        }
    }
    
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const option: DeliveryOption = JSON.parse(event.target.value)
        setSelectedOption(option.name)
        setFreightValue(option.price)    
    }
    
    return (
        <div className="w-[352px] h-fit bg-gray-50 px-6 py-4 rounded-xl shadow-lg">
            <p className="text-xl font-semibold">FRETE E PRAZOS</p>
            <div className="flex mt-4 first-letter justify-between">
                <InputCEP cep={cep} onChange={handleCepChange}  onEnterPress={handleSubmit}/>
                <FreightButton onClick={handleSubmit} isAnimating={isAnimating}/>
            </div>
            <div className={`${hideInfo ? 'hidden' : 'block'}`}>
                <FreightOption 
                    data={data} 
                    selectedOption={selectedOption} 
                    handleOptionChange={handleOptionChange}
                />
            </div>
        </div>
    )
}
