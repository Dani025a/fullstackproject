import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Order {
    orderId: number;
    date: string;
    totalQuantity: number;
    totalPrice: number;
    orderStatus: string;
    payment: {
      paymentId: number;
      transactionNumber: string;
      cardNumber: string;
    };
  }

const apiClient = new ApiClient<Order>("/orders");

export const useOrder = (userId: string, isLogged: boolean) => {
    return useQuery({
      queryKey: ["orders", userId],
      queryFn: () => apiClient.getAllOrders(userId),
      enabled: isLogged, 
    });
  };


export default useOrder;