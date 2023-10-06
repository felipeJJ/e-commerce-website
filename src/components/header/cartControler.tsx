import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function CartControler() {
  const { value } = useLocalStorage('cart-items');
  const [count, setCount] = useState('')

  useEffect(() => {
    if (value && value.length > 0) {
        setCount(value.length)
    }
  }, [value]);

  return (
    <div className="bg-red-600 w-4 h-4 rounded-full translate-y-3 translate-x-4 absolute flex justify-center">
      {count && <p className=" text-xs text-white">{count}</p>}
    </div>
  );
}
