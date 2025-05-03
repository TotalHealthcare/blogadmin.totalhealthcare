import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:3008";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "authToken"
)}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);

export default axios;
