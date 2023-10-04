import useData from "./useData";
import { Category } from "./useCategories"
import { ProductQuery } from "../pages/Store";

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  productId: number;
}


const useProducts = (
  productQuery: ProductQuery
) =>
  useData<Product>(
    "products",
    {

      
      params: {

        categoryid: productQuery.category?.categoryId,
        ordering: productQuery.sortOrder,
        search: productQuery.searchText
      },
    },
    [productQuery]
  );

export default useProducts;