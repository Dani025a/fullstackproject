import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance"


export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export interface Address {
  id: any;
  zip_code: string;
  street_name: string;
  city: string;
  street_number: string;
}

export interface PasswordUpdateData {
  oldPassword: string;
  newPassword: string;
}

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then(res => res.data);

  getdata = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<T[]>(this.endpoint, config)
      .then(res => res.data);

  getById = (id: string | number, config?: AxiosRequestConfig) =>
    axiosInstance
      .get<T>(`${this.endpoint}/${id}`, config)
      .then(res => res.data);
      
   signIn = async (email: string, password: string) => {
    return axiosInstance.post('/users/signin', {
      email,
      password,
    }).then(res => res.data);
  };

  getTopTen = (config?: AxiosRequestConfig) =>
  axiosInstance
    .get<T[]>(this.endpoint, config)
    .then(res => res.data);

  updateUser = (id: string | number, newData: T, config?: AxiosRequestConfig) =>
    axiosInstance
      .put(`${this.endpoint}/${id}`, newData, config)
      .then(res => res.data);

      updateAddress = (userId: string | number, newAddress: Address, config?: AxiosRequestConfig) => {
        return axiosInstance
          .put(`${this.endpoint}/${userId}`, newAddress, config)
          .then(res => res.data);
      };
      
        
        updatePassword = (userId: string | number, passwordData: PasswordUpdateData, config?: AxiosRequestConfig) =>
        axiosInstance
          .put(`${this.endpoint}/${userId}/password`, passwordData, config)
          .then(res => res.data);
          
          deleteUser = (userId: string | number, password: string, config?: AxiosRequestConfig) =>
          axiosInstance
            .delete(`${this.endpoint}/${userId}`, { data: { password }, ...config })
            .then(res => res.data);

            getAllOrders = (userId: string, config?: AxiosRequestConfig) =>
            axiosInstance
              .get<T[]>(`${this.endpoint}/${userId}`, config)
              .then(res => res.data);
        
          getOrderById = (orderId: string, config?: AxiosRequestConfig) =>
            axiosInstance
              .get<T>(`${this.endpoint}/${orderId}/orderdetails`, config)
              .then(res => res.data);
}

export default ApiClient;
