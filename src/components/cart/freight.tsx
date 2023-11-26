import { useState } from "react"
import TruckIcon from "./truckIcon"
import LoadingIcon from "./loadingIcon"
import { useCartContext } from "@/contexts/cartContext"
import { FreightResponse } from "../../../types"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

export default function Freight() {

    const { count, freightValue, setFreightValue } = useCartContext()
    const [ cep, setCep ] = useState('')
    const [ hideInfo, setHideInfo ] = useState(true)
    const [ isAnimating, setIsAnimating ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState<'pac' | 'sedex' | ''>('')
    const [ data, setData ] = useState<FreightResponse>({
        cepdestino: '',
        ceporigem: '',
        prazopac: '',
        prazosedex: '',
        valorpac: '',
        valorsedex: '',
    })

    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formattedCep = event.target.value.replace(/\D/g, '')

        if (formattedCep.length > 5) {
            formattedCep = formattedCep.replace(/^(\d{5})(\d)/, '$1-$2')
        }
        setCep(formattedCep)
    }

    const MySwal = withReactContent(Swal)

    const handleClick = async () => {
        setIsAnimating(true)

        const formatedCep = cep.replace(/\D/g, '')

        if( formatedCep.length >= 8){
            try {
                const res = await fetch(`https://cepcerto.com/ws/json-frete/29060370/${formatedCep}/${count*300}/${count*10}/${count*10}/${count*10}/edaffb0b343f1e4623e66fe0e3b09b1d33b86fa1`)
                const repo = await res.json()
                if(repo.msg){
                    MySwal.fire({
                        title: "Error!",
                        text: `${repo.msg}`,
                        width: 300,
                    })
                }
                setData(repo)
                setHideInfo(false)

                setTimeout(() => {
                    setIsAnimating(false)
                }, 1000)

            } catch (error) {
                console.error('Erro ao buscar dados da API', error)
            }
        }
    }

    const handleCheckboxChange = (option: 'pac' | 'sedex') => {
        setSelectedOption(option)
        const selectedDataValue = option === 'pac' ? data.valorpac : data.valorsedex
        setFreightValue(selectedDataValue)
    }

    return(
        <div className="w-[352px] h-[280px] bg-gray-50 px-6 py-4 rounded-xl shadow-lg">
            <p className="text-xl font-semibold">FRETE E PRAZOS</p>
            <div className="flex mt-4 first-letter justify-between">
                <input
                    className="bg-gray-50 border-2 border-gray-100 outline-red-500 w-32 rounded-xl px-3"
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    placeholder="Digite o CEP"
                    maxLength={9} 
                />
                <button className={`flex bg-slate-200 px-3 py-1 rounded-lg ${isAnimating ? 'sm:animate-bounce' : ''}`} 
                    onClick={handleClick}
                >
                    {isAnimating ? <LoadingIcon/> : <TruckIcon/>}
                    Calcular
                </button>
            </div>
            <div className={`${hideInfo ? 'hidden' : 'block'}`}>
                <div className="mt-4">
                    <div className="flex ">
                    <input type="checkbox" id="pac" checked={selectedOption === 'pac'} 
                        onChange={() => handleCheckboxChange('pac')} 
                    />
                        <h1 className="font-semibold ml-2">PAC</h1>
                    </div>
                    <div className="flex justify-between ml-7">
                        <div>
                            <p>Prazo</p>
                            <p>Valor</p>
                        </div>
                        <div>
                            <p>{data.prazopac} dias</p>
                            <p>R$ {data.valorpac}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex ">
                    <input type="checkbox" id="sedex" checked={selectedOption === 'sedex'} 
                        onChange={() => handleCheckboxChange('sedex')} 
                    />
                        <h1 className="font-semibold ml-2">SEDEX</h1>
                    </div>
                    <div className="flex justify-between ml-7">
                        <div>
                            <p>Prazo</p>
                            <p>Valor</p>
                        </div>
                        <div>
                            <p>{data.prazosedex} dias</p>
                            <p>R$ {data.valorsedex}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}