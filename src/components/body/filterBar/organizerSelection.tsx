import { useOrganizerContext } from "@/contexts/organizerContext"
import { ChangeEvent } from "react"

export default function OrganizerSelection() {
    const { setOrganizer } = useOrganizerContext()

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedOrganizer = e.target.value;
        setOrganizer(selectedOrganizer);
    }

    return(
        <div className="mb-6 h-6 flex justify-end ">
            <select onChange={handleChange} className=" outline-none" id="organizer">
                <option value="">Organizar por</option>
                <option value="newest">Novidades</option>
                <option value="bigest">Preço: maior - menor</option>
                <option value="lowest">Preço: menor - maior</option>
            </select>
        </div>
    )
}