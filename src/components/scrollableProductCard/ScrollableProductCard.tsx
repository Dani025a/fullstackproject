import React from 'react';
import { Link } from 'react-router-dom';
import './scrollableProductCard.css'

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  id: number;
}

interface Props { 
  product: Product
}

const ScrollableProductCard = ({ product }: Props) => {
  return(
    <div className="scrollable-product-card">
      <div className="scrollable-product-card-image">
        <img src={product.imageurl} alt={product.name} />
      </div>
      <div className="scrollable-product-card-info">
        <h3>{product.name}</h3>
        <h4>{product.price} DKK</h4>
      </div>
      <Link to={`/product/${product.name}`} state={{ product: product }} className="scrollable-product-card-link">
        Learn more
      </Link>
    </div>
  );
};

export default ScrollableProductCard;