import './productdetail.css';
import { useLocation } from 'react-router-dom';
import { useShoppingCart } from '../../context/ShoppingCartContext';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state.product;

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(product.id)
  return (
    <div className="product-details">
      <img src={product.imageurl} alt="productgrid_image" />

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h4>{product.price} DKK</h4>
        {quantity === 0 ? (
    <button onClick={() => increaseCartQuantity(product.id)}>Buy</button>
    ) : (
      <div  className="website__productdetails_buttons">
        <button onClick={() => decreaseCartQuantity(product.id)}>-</button>
        <button onClick={() => increaseCartQuantity(product.id)}>+</button>
        <button onClick={() => removeFromCart(product.id)}>Remove</button>
        <button>{quantity}</button>
      </div>
    )}
      </div>
    </div>
  );
};

export default ProductDetails;