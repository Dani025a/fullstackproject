import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoryList from '../components/CategoryList/CategoryList';
import './store.css';
import { Product } from '../hooks/useProducts';

export interface ProductQuery {
  categoryId?: number;
  product: Product | null;
  sortOrder: string;
}

export const Store = () => {
  const [productQuery, SetProductQuery] = useState<ProductQuery>({} as ProductQuery);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSortChange = (sortOrder: string) => {
    SetProductQuery({ ...productQuery, sortOrder });
  };

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
              onSelectCategory={(category) =>
                SetProductQuery({ ...productQuery, categoryId: category?.id })
              }
              selectedCategoryId={productQuery.categoryId}
            />
          </div>
        </div>
      )}

      <div className="sort-dropdown">
        <select onChange={(e) => handleSortChange(e.target.value)}>
          <option value="price:desc">Price: High to Low</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="name:asc">Name: A-Z</option>
          <option value="name:desc">Name: Z-A</option>
        </select>
      </div>

      <div className="content">
        <ProductGrid
          productQuery={productQuery}
        />
      </div>
    </div>
  )
}
