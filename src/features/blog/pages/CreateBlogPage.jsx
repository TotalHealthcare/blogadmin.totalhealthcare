import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../hooks/useBlog";
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

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const { mutate: createBlog, isLoading, isError, error } = useCreateBlog();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = { title, content, coverImage };

    createBlog(blogData, {
      onSuccess: () => {
        // Redirect to the blog list after creation
        navigate("/blogs");
      },
    });
  };

  return (
    <FormContainer>
      <h1>Create New Blog</h1>
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
        <label htmlFor="coverImage">Cover Image URL (optional)</label>
        <TitleInput
          type="text"
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Blog"}
        </Button>
        {isError && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default CreateBlogPage;
