import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  id: number;
}

const apiClient = new ApiClient<Product>("/productslist");

const useProductsCart = () => {
  return useQuery<Product[], Error>(["productslist"], () =>
    apiClient.getdata()
  );
};

export default useProductsCart;