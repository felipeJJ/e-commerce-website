import { useLocalStorage } from '@/hooks/useLocalStorage' // Assuming this is the path to your custom hook

export function Test() {
 const cart = useLocalStorage('cart-items', []);

 return {
  cart
 }
}
