import useCategories, { Category } from "../../hooks/useCategories";
import './categoryList.css';

interface Props {
  selectedCategoryId?: number;
  onSelectCategory: (category: Category | null) => void;
}


const CategoryList = ({ selectedCategoryId, onSelectCategory }: Props) => {
  const { data: categories, error, isLoading } = useCategories();
  const numOfSkeletons = 10;

  if (error) return null;

  if (isLoading) {
    return (
      <div className="website__categories_content">
        <h1>Categories</h1>
        {[...Array(numOfSkeletons)].map((_, idx) => (
          <div className="skeleton-loader" key={idx}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="website__categories_content">
      <h1>Categories</h1>
      <ul className="categories-list">
        <li
          className={!selectedCategoryId ? 'selected' : ''}
          onClick={() => onSelectCategory(null)}
        >
          All products
          <div className="underline"></div>
        </li>

        {Array.isArray(categories) && categories.map((category: Category) => (
          <li
            key={category.id}
            className={selectedCategoryId === category.id ? 'selected' : ''}
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
