import { Spinner } from "@chakra-ui/react";
import useCategories, { Category } from "../../hooks/useCategories";
import './categoryList.css'

interface Props {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

const CategoryList = ({ selectedCategory, onSelectCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
      <div className="website__categories_content">
      <h1>Categories</h1>
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