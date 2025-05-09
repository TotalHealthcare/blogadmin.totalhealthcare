import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../../../context/authContext";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.accessToken) {
        login(data.accessToken);
        const userData = {
          token: data.accessToken,
          user: data.user,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/blogs/create";
      } else {
        console.error("No token received");
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};
