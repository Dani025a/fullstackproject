import React, { useState } from 'react'
import './productGrid.css'
import { Category } from "../../hooks/useCategories"
import useProducts from "../../hooks/useProducts";
import ProductCard from '../ProductCard/ProductCard';

interface Props {
  selectedcategory: Category | null;
}
  


const ProductGrid = ({ selectedcategory }: Props) => {
  const {
    data: products,
    error,
    isLoading,
  } = useProducts(selectedcategory);
  return (
    <>
    {error && <p>{error}</p>}
    <div className="website__productgrid section__padding">
    <div className="website__productgrid-container">
      <div className="website__productgrid-container_content">
      {isLoading }
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
