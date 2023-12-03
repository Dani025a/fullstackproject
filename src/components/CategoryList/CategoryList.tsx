import React from 'react';
import useCategories, { Category } from "../../hooks/useCategories";
import './categoryList.css'

interface Props {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryList = ({ selectedCategory, onSelectCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();
  const numOfSkeletons = 10;

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
            All products
            <div className="underline"></div>
          </li>
          
          {categories?.map((category) => (
            <li 
              key={category.id} 
              className={selectedCategory?.id === category.id ? 'selected' : ''} 
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
              <div className="underline"></div>
            </li>
            
          ))}
        </ul>
    </div>
  );
};

export default CategoryList;