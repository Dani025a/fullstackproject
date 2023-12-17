import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

interface ProductDetail {
    name: string;
    price: string;
  }
  
  interface LineItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: ProductDetail;
    name: string;
    price: number;
  }
  
  interface PaymentDetail {
    card_number: string;
    transaction_number: string;
  }
  
  interface Payment {
    id: number;
    total_price: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    paymentDetails: PaymentDetail[];
  }
  
  interface OrderDetails {
    id: number;
    userId: number;
    orderStatusId: number;
    paymentId: number;
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    lineItems: LineItem[];
    orderStatus: string;
    payment: Payment;
  }

const apiClient = new ApiClient<OrderDetails>("/orders");

export const useOrder = (orderId: string, isLogged: boolean) => {
    return useQuery({
      queryKey: ["orders", orderId],
      queryFn: () => apiClient.getOrderById(orderId),
      enabled: isLogged, 
    });
  };


export default useOrder;