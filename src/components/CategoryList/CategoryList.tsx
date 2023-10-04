import { Spinner } from "@chakra-ui/react";
import useCategories, { Category } from "../../hooks/useCategories";
import './categoryList.css'

interface Props {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryList = ({ selectedCategory, onSelectCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;

  if (isLoading) return null;

  return (
      <div className="website__categories_content">
      <h1>Categories</h1>
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
        >
          Clear Categor
        </button>
      <ul>
        {categories?.map((category) => (<button
        onClick={() => onSelectCategory(category)}
        type="button"
        key={category.categoryId}
          >
            {category.name}</button>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;