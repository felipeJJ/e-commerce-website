import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import axios from 'axios'

interface ApiIbgeata{
  UF: string
  id: string
  nome: string
}

export default function SelectCidade() {
    const { getValues, register, setValue } = useFormContext()
    const state = getValues("state")
    const [cidades, setCidades] = useState<ApiIbgeata[]>([])

    useEffect(() => {
        setValue("city", "")
    }, [setValue, state])

    useEffect(() => {
        fetchData()
        async function fetchData() {
            const ibgeDados = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos?orderBy=nome`)
            setCidades(ibgeDados.data)
        }
    }, [state])

    return ( 
        <label className="flex items-center mt-4">
            <select
                className="select select-bordered w-full" 
                id="teste"
                {...register("city")}
            >
                <option value="" hidden> selecione uma cidade:</option>
                {cidades.map((cidade: ApiIbgeata) => (
                    <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                ))}
            </select>
        </label>
    )
}
