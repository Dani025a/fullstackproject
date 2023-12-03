import React, { useState } from 'react';
import { Category } from '../hooks/useCategories';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoryList from '../components/CategoryList/CategoryList';
import './store.css';
import { Product } from '../hooks/useProducts';

export interface ProductQuery {
  product: Product | null;
  category: Category | null;
  sortOrder: string;
  searchText: string;
}

export const Store = () => {
  const [productQuery, SetProductQuery] = useState<ProductQuery>({} as ProductQuery);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="website__store-container">
      {!isSidebarOpen && (
        <button 
          className="sidebar-button" 
          onClick={() => setIsSidebarOpen(true)} 
        >
          Open Menu
        </button>
      )}
      
      {isSidebarOpen && (
        <div className="sidebar">
          <button 
            className="close-button"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close Menu
          </button>
          <div className="category-list">
          <CategoryList
            onSelectCategory={(category) => SetProductQuery({ ...productQuery, category })}
            selectedCategory={productQuery.category}
          />
        </div>
        </div>
      )}

      <div className="content">
        <ProductGrid
          productQuery={productQuery}
        />
      </div>
    </div>
  )
}
