import { useFormContext } from "react-hook-form";
import AddressInput from "./addressInput";
import SelectCidade from "./citySelect";
import SelectEstado from "./stateSelect";
import ZipCodeInput from "./zipCodeInput";
import HouseNumber from "./houseNumber";

export default function UserAddressForm() {
    const { register, formState: { errors } } = useFormContext()

  return (
    <>
        <SelectEstado />
        {errors.state && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.state.message as string}</p>}
        <SelectCidade />
        {errors.city && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.city.message as string}</p>}
        <ZipCodeInput />
        {errors.zip && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.zip.message as string}</p>}
        <AddressInput />
        {errors.address && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.address.message as string}</p>}
        <HouseNumber/>
        {errors.houseNumber && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.houseNumber.message as string}</p>}
        <label className="input input-bordered flex items-center mt-4">
            <input 
                {...register("district")}
                className="grow" 
                placeholder="Bairro*"
            />
        </label>
        {errors.district && <p className="text-sm text-red-800 pl-2 mt-1" role="alert">{errors.district.message as string}</p>}
    </>
  )
}

