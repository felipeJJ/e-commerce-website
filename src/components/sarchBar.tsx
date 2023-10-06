import SarchIcon from './sarchIcon'


export default function SarchBar() {
    return(
        <div className=" bg-gray-100 w-[359px] h-11 py-2 px-4 rounded-lg flex mr-5">
            <input type="text" className=" bg-gray-100 w-[206px] mr-24" placeholder='Procura por algo específico'/>
            <SarchIcon/>
        </div>
)
}