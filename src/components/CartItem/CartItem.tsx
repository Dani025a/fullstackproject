import { useShoppingCart } from "../../context/ShoppingCartContext"
import useProductsCart from "../../hooks/useProductsCart"
import './cartItem.css'


type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
  const { data: products } = useProductsCart();

  const item = products?.find(i => i.id === id)
  if (item == null) return null

  return (
    <div className='product-card'>
      <button className='remove-button' onClick={() => removeFromCart(item.id)}>×</button>
      <img src={item.imageurl} alt={item.name} className='product-image' />
      <span className='product-name'>{item.name}</span>
      <div className='quantity-selector'>
        <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increaseCartQuantity(item.id)}>+</button>
      </div>
      <span className='product-price'>{item.price} kr</span>
    </div>
  );
};