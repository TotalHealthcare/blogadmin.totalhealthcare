import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as blogService from "../services/blogService";
// import { useAuth } from "../../../context/authContext";
export const useBlogs = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => blogService.getBlogs(page, limit),
    keepPreviousData: true,
  });
};

export const useBlog = (slug) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, blogData }) => blogService.updateBlog(slug, blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { user } = useAuth();
  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      navigate("/blog");
    },
    onError: (error) => {
      throw error;
    },
  });
};
