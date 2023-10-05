import React, { useState } from 'react'
import { Category } from '../hooks/useCategories';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoryList from '../components/CategoryList/CategoryList';
import './store.css'
import { Product } from '../hooks/useProducts';

export interface ProductQuery {
  product: Product | null;
  category: Category | null;
  sortOrder: string;
  searchText: string;
}


export const Store = () => {
  const [productQuery, SetProductQuery] = useState<ProductQuery>({} as ProductQuery);

  return (
    <div className="website__store-container">
      <CategoryList
        onSelectCategory={(category) => SetProductQuery({ ...productQuery, category })}
        selectedCategory={productQuery.category}
      />
      <ProductGrid
        productQuery={productQuery}
      />
    </div>
  )
}