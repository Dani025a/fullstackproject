import ApiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";


export interface Category {
  id: number;
  name: string;
}

const apiClient = new ApiClient<Category>("/categories");


const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: apiClient.getAll,
    staleTime: ms("5s"),
  });
};

export default useCategories;