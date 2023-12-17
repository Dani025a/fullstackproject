import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Product {
  description: string;
  imageurl: string;
  name: string;
  price: number;
  id: number;
}

const apiClient = new ApiClient<Product>("/products/top-sold");

const useTopTenProducts = () => {
  return useQuery<Product[], Error>(["top-sold"], () =>
    apiClient.getdata()
  );
};

export default useTopTenProducts;