import CartIcon from "./cartIcon"


interface ProductCardProps {
    productId: string
  }

export default function ButtonCart({ productId }: ProductCardProps) {

    function handleCart(){
        let cartItems = localStorage.getItem('cart-items')
        if(cartItems) {
            let cartItemsArray = JSON.parse(cartItems)

            let existingProductIndex = cartItemsArray.findIndex((item: { id: string; }) => item.id === productId)

            if(existingProductIndex != -1){
                cartItemsArray[existingProductIndex].quantity += 1
            } else {
                cartItemsArray.push({ productId, quantity: 1, id: productId })
            }

            localStorage.setItem('cart-items', JSON.stringify(cartItemsArray))
        } else {
            const newCart = [{ productId, quantity: 1, id: productId }]
            localStorage.setItem('cart-items', JSON.stringify(newCart));
        }
    }

  return (
    <button
        onClick={handleCart}
        className="mr-4 mt-1 w-8 h-8 pl-1 bg-gray-100 rounded-full"
    >
        <CartIcon />
    </button>
  )
}
