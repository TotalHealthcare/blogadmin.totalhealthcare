import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      if (data && data.accessToken) {
        const token = data.accessToken;
        localStorage.setItem("authToken", token);
      } else {
        console.error("Token is missing in the response data");
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
