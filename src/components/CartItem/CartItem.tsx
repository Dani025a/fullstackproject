import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import useProducts from "../../hooks/useProducts"


type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const {data: products, error, isLoading} = useProducts({product: null, category: null, sortOrder: '', searchText: ''});

  const item = products.find(i => i.productId === id)
  if (item == null) return null

  return (
    <div className="website__productgrid-container_productcard" >
    <div className="website__productgrid-container_productcard-image">
      <img src={item.imageurl} alt="productgrid_image" />
    </div>
    <div className="website__productgrid-container_productcard-content">
      <div>
        <h3>{item.name}</h3>
        <h4>{item.productId}  DKK</h4>
      </div>
    </div>
    <div className="website__productgrid-container_productcard-buy">

      <div  className="website__productgrid-container_productcard-buyedit">
        <div  className="website__productgrid-container_productcard_buyedit-remove">
        <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
        <div  className="website__productgrid-container_productcard_buyedit-quantity">
          <button>{quantity}</button>
        </div>
      </div>
    </div>
    <div className="website__productgrid-container_productcard-learnmore">
    <button>Learn more</button>
    </div>
  </div>
  )
}