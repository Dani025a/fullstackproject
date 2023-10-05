import React, { useEffect, useState } from 'react'
import './productGrid.css'
import useProducts from "../../hooks/useProducts";
import ProductCard from '../ProductCard/ProductCard';
import { ProductQuery } from '../../pages/Store';
import ProductCardLoader from '../ProductCard/ProductCardLoader';

interface Props {
  productQuery: ProductQuery;
}



const ProductGrid = ({ productQuery }: Props) => {
  const {data: products, error, isLoading} = useProducts(productQuery);

  if (error) return <div><p className="error-text">{error}</p></div>;
  
  return (
    <>
    {error && <p className="error-text">{error}</p>}
      <div className="website__productgrid section__padding">
        <div className="website__productgrid-container">
          <div className="website__productgrid-container_content">
            {isLoading && [...Array(20)].map((_, index) => (
              <ProductCardLoader key={index} />
            ))}
            {products.map((product) => (
              <ProductCard key={product.productId} product={product}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductGrid
