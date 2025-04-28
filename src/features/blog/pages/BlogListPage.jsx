import React from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlog";
import styled from "styled-components";

const ListContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BlogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BlogItem = styled.li`
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const BlogPreview = styled.p`
  font-size: 1rem;
  color: #555;
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const BlogListPage = () => {
  const { data: blogs, isLoading, isError, error } = useBlogs();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ListContainer>
      <h1>Blog List</h1>
      <ButtonLink to="/blogs/create">Create New Blog</ButtonLink>
      <BlogList>
        {blogs.map((blog) => (
          <BlogItem key={blog.id}>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogPreview>{blog.content.slice(0, 150)}...</BlogPreview>
            <ButtonLink to={`/blogs/${blog.id}`}>Read More</ButtonLink>
          </BlogItem>
        ))}
      </BlogList>
    </ListContainer>
  );
};

export default BlogListPage;
