import React from 'react'
import TruckIcon from "./truckIcon"
import LoadingIcon from "./loadingIcon"

interface CalcularFreteButtonProps {
    onClick: () => void
    isAnimating: boolean
}

export const FreightButton: React.FC<CalcularFreteButtonProps> = ({ onClick, isAnimating }) => {
    return (
        <button
            className={` btn border-none flex bg-slate-200 px-3 py-1 rounded-lg ${isAnimating ? 'sm:animate-bounce' : ''}`}
            onClick={onClick}
        >
            {isAnimating ? <LoadingIcon/> : <TruckIcon/>}
            Calcular
        </button>
    )
}
