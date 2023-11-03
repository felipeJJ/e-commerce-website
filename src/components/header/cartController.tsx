import { useFilterContext } from "@/contexts/filterContext" 
import { useEffect } from "react"

export default function CartControler() {
const { count, setCount } = useFilterContext()
  
  useEffect(() => {
    let TemCount = Number(localStorage.getItem('count')) 
    if (TemCount) setCount(TemCount)  
  }, [setCount])
  

  return (
    <div className="bg-red-600 w-4 h-4 rounded-full translate-y-3 translate-x-4 absolute flex justify-center">
      {count >= 0 && (
        <span className="text-xs text-white">{count}</span>
      )}
    </div>
  )
}