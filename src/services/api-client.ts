import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7221/api",
});

export default apiClient;