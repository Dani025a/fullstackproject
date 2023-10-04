import React, { useState } from 'react'
import { Category } from '../hooks/useCategories';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CategoryList from '../components/CategoryList/CategoryList';
import './store.css'

export const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="website__products" id="products">
    <div className="website__products-container">
    <CategoryList
    onSelectCategory={(category) => setSelectedCategory(category)}
    selectedCategory={selectedCategory}
    />
    <ProductGrid
    selectedcategory={selectedCategory}
    />
    </div>
    </div>
  )
}
