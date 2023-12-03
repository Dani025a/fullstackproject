import ApiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";


export interface Category {
  id: number;
  name: string;
}

const apiClient = new ApiClient<Category>("/categories");

const useCategories = () => {
  return useQuery<Category[], Error>(["categories"], () =>
    apiClient.getAll({})
  );
};

export default useCategories;