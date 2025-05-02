import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const BlogContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError, error } = useBlog(id);

  useEffect(() => {
    if (isError) {
      navigate("/blogs");
    }
  }, [isError, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogContent>{blog.content}</BlogContent>
      <BackButton onClick={() => navigate("/")}>Back to Blogs</BackButton>
    </Container>
  );
};

export default BlogDetailPage;
