import axios from "axios";

export const loginUser = async (data) => {
  const response = await axios.post("http://localhost:3008/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(
    "http://localhost:3008/auth/register",
    data
  );
  return response.data;
};
