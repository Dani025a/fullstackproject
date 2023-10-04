import useData from "./useData";
import { Category } from "./useCategories"

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  productId: number;
}


const useProducts = (
  selectedCategory: Category | null,
) =>
  useData<Product>(
    "products",
    {

      
      params: {

        categoryid: selectedCategory?.categoryId
      },
    },
    [selectedCategory?.categoryId]
  );

export default useProducts;