import axios from "axios";

axios.defaults.baseURL = "http://localhost:3008";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "authToken"
)}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request. Redirecting to login.");
      console.error("Unauthorized request. Redirecting to login.");
      console.log(
        "Auth Token in LocalStorage before redirect:",
        localStorage.getItem("authToken")
      );

      localStorage.removeItem("authToken");
      // window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axios;
