import React from 'react';
import useCategories, { Category } from "../../hooks/useCategories";
import './categoryList.css'

interface Props {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryList = ({ selectedCategory, onSelectCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();
  const numOfSkeletons = 10;  // Adjust the number according to your design

  if (error) return (null)

  if (isLoading) return (
    <div className="website__categories_content">
      <h1>Categories</h1>
      {[...Array(numOfSkeletons)].map((_, idx) => (
        <div className="skeleton-loader" key={idx}></div>
      ))}
    </div>
  );

  return (
    <div className="website__categories_content">
      <h1>Categories</h1>
        <ul className="categories-list">
          <li 
            className={!selectedCategory ? 'selected' : ''} 
            onClick={() => onSelectCategory(null)}
          >
            Clear Categories
          </li>
          {categories?.map((category) => (
            <li 
              key={category.categoryId} 
              className={selectedCategory?.categoryId === category.categoryId ? 'selected' : ''} 
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default CategoryList;