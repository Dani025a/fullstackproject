import React from 'react';
import './productCard.css'
import { Product } from '../../hooks/useProducts';
import { useShoppingCart } from '../../context/ShoppingCartContext';

interface Props { 
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(product.productId)

  return(
  <div className="website__productgrid-container_productcard" >
    <div className="website__productgrid-container_productcard-image">
      <img src={product.imageurl} alt="productgrid_image" />
    </div>
    <div className="website__productgrid-container_productcard-content">
      <div>
        <h3>{product.name}</h3>
        <h4>{product.productId}  DKK</h4>
      </div>
    </div>
    <div className="website__productgrid-container_productcard-buy">
    {quantity === 0 ? (
    <button onClick={() => increaseCartQuantity(product.productId)}>Buy</button>
    ) : (
      <div  className="website__productgrid-container_productcard-buyedit">
        <div  className="website__productgrid-container_productcard_buyedit-decrease">
        <button onClick={() => decreaseCartQuantity(product.productId)}>-</button>
        </div>
        <div  className="website__productgrid-container_productcard_buyedit-increase">
        <button onClick={() => increaseCartQuantity(product.productId)}>+</button>
        </div>
        <div  className="website__productgrid-container_productcard_buyedit-remove">
        <button onClick={() => removeFromCart(product.productId)}>Remove</button>
        </div>
        <div  className="website__productgrid-container_productcard_buyedit-quantity">
          <button>{quantity}</button>
        </div>
      </div>
    )}
    </div>
    <div className="website__productgrid-container_productcard-learnmore">
    <button>Learn more</button>
    </div>
  </div>
  );
};

export default ProductCard;

