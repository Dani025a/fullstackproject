import React, { useState } from 'react'
import './productGrid.css'
import { Category } from "../../hooks/useCategories"
import useProducts from "../../hooks/useProducts";
import ProductCard from '../ProductCard/ProductCard';
import { ProductQuery } from '../../pages/Store';
import Spinner from '../Spinner';

interface Props {
  productQuery: ProductQuery;
}



const ProductGrid = ({ productQuery }: Props) => {
  const {data: products, error, isLoading} = useProducts(productQuery);

  return (
    <>

{(error || isLoading) &&
        <div className="website__message-container">
            {error && <div className='website__error-container'><p>{error}</p></div>}
            {isLoading && <Spinner />}
        </div>
}
    <div className="website__productgrid section__padding">
    <div className="website__productgrid-container">
      <div className="website__productgrid-container_content">
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
