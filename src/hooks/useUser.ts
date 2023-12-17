import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  Address: Address
}

export interface Address {
    id: any;
    zip_code: string;
    street_name: string;
    city: string;
    street_number: string;
  }
  

const apiClient = new ApiClient<User>("/users");

export const useUser = (userId: string | number, isLogged: boolean) => {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: () => apiClient.getById(userId),
      enabled: isLogged, 
    });
  };


export default useUser;