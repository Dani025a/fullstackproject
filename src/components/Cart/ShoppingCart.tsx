import { useShoppingCart } from "../../context/ShoppingCartContext"
import { CartItem } from "../CartItem/CartItem"
import useProducts from "../../hooks/useProducts"


export function ShoppingCart() {
  const { closeCart, cartItems } = useShoppingCart()
  const {
    data: products,
    error,
    isLoading,
  } = useProducts(null);
  return (
    <>
    {error && <p>{error}</p>}
    <div className="website__productgrid section__padding">
    <div className="website__productgrid-container">
      <div className="website__productgrid-container_content">
      {isLoading }
      {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
            Total{" "}
            {
              cartItems.reduce((total, cartItem) => {
                const item = products.find(i => i.productId === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            }
          </div>
      </div>
    </div>
  </>

  )
}