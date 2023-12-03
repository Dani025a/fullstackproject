import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/sql/",
});


class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
  apiClient
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
}

export default ApiClient;