import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function CartControler() {
  const { value } = useLocalStorage('cart-items', [])

  return (
    <div className="bg-red-600 w-4 h-4 rounded-full translate-y-3 translate-x-4 absolute flex justify-center">
      {value.length > 0 && (
        <span className="text-xs text-white">{value.length}</span>
      )}
    </div>
  )
}