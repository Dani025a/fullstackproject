import { ProductQuery } from "../pages/Store";
import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { FetchResponse } from "../services/api-client";
import ms from "ms";

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  id: number;
}

const apiClient = new ApiClient<Product>("/products");

const useProducts = (productQuery: ProductQuery) => {
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ["products", productQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          categoryId: productQuery.categoryId,
          sortOrder: productQuery.sortOrder,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("5s"),
  });
};


export default useProducts;