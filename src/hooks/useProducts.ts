import { ProductQuery } from "../pages/Store";
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  id: number;
}



const apiClient = new ApiClient<Product>("/products");

const useProducts = (productQuery: ProductQuery) => {
  const categoryId = productQuery.category?.id;
  console.log('Category ID:', categoryId);
  
  const apiParams = {
    params: {
      categoryid: categoryId,
      ordering: productQuery.sortOrder,
      search: productQuery.searchText,
    },
  };

  console.log('API Params:', apiParams);  // Log API parameters

  return useQuery<Product[], Error>(["products", productQuery], () =>
    apiClient.getAll(apiParams)
  );
};


export default useProducts;