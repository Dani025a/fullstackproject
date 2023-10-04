import useData from "./useData";

export interface Category {
  categoryId: number;
  name: string;
}

const useCategories = () => useData<Category>("categories");

export default useCategories;