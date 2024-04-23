import { useFormContext } from 'react-hook-form'

export default function AddressInput() {
    const { register} = useFormContext()

    return ( 
        <label className="input input-bordered flex items-center mt-4">
            <input className="grow" placeholder="Logradouro*" {...register("address")}/>
        </label>
    )
}
