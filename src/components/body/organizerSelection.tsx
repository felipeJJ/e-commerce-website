import { useOrganizerContext } from "@/contexts/organizerContext"
import { ChangeEvent } from "react";

export default function OrganizerSelection() {
    const {  organizer, setOrganizer } = useOrganizerContext()

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedOrganizer = e.target.value;
        setOrganizer(selectedOrganizer);
    }

    return(
        <div className="flex items-center justify-end 2xl:mr-9 pb-6 ">
            <select onChange={handleChange} className=" outline-none" id="organizer">
                <option value="">Organizar por</option>
                <option value="newest">Novidades</option>
                <option value="bigest">Preço: maior - menor</option>
                <option value="lowest">Preço: menor - maior</option>
            </select>
        </div>
    )
}