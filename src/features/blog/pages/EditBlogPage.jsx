import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog, useUpdateBlog } from "../hooks/useBlog";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  height: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 10px;

  &:disabled {
    background-color: #cccccc;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const EditBlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading } = useBlog(slug);
  const {
    mutate: updateBlog,
    isLoading: isUpdating,
    isError,
    error,
  } = useUpdateBlog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog?.title && blog?.content) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(
      { slug, blogData: { title, content } },
      {
        onSuccess: () => {
          navigate(`/blogs/${slug}`);
        },
      }
    );
  };

  if (isLoading) return <div>Loading blog...</div>;

  return (
    <FormContainer>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <TitleInput
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Blog"}
        </Button>
        {isError && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default EditBlogPage;
