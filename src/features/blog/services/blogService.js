import axios from "axios";

const API_URL = "http://localhost:3008/blog";
const token = localStorage.getItem("authToken");
export const getBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
