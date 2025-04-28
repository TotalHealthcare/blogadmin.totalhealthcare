import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as blogService from "../services/blogService";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getBlogs,
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id,
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
    mutationFn: ({ id, blogData }) => blogService.updateBlog(id, blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
