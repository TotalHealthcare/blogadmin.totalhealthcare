import React, { useState, useEffect } from "react";
import { useBlogs } from "../hooks/useBlog";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BlogListPage = () => {
  const { data, isLoading, isError, error } = useBlogs();
  const blogs = Array.isArray(data) ? data : [];

  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (blogs.length > 0) setSelectedBlog(blogs[0]);
  }, [blogs]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <BlogListColumn>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} onClick={() => setSelectedBlog(blog)}>
            <CardTitle>{blog.title}</CardTitle>
            <CardMeta>
              {typeof blog.author === "string" ? blog.author : "Unknown"} ·{" "}
              {new Date(blog.publishedAt).toDateString()}
            </CardMeta>
            <CardExcerpt>
              {blog.excerpt || blog.content.slice(0, 100)}...
            </CardExcerpt>
          </BlogCard>
        ))}
      </BlogListColumn>

      <BlogPreviewColumn>
        {selectedBlog ? (
          <BlogDetail>
            <DetailTitle>{selectedBlog.title}</DetailTitle>
            <DetailImage
              src={
                selectedBlog.image ||
                "https://source.unsplash.com/800x500/?blog,nature"
              }
              alt={selectedBlog.title}
            />
            <DetailMeta>
              {typeof selectedBlog.author === "object"
                ? selectedBlog.author.name
                : selectedBlog.author || "Unknown"}{" "}
              · {new Date(selectedBlog.createdAt).toDateString()}
            </DetailMeta>
            <DetailContent>{selectedBlog.content}</DetailContent>
            <ButtonLink to={`/blogs/${selectedBlog._id}`}>Delete</ButtonLink>
            <EditButtonLink to={`/blogs/${selectedBlog.slug}/edit`}>
              Edit
            </EditButtonLink>
          </BlogDetail>
        ) : (
          <p>Select a blog to preview</p>
        )}
      </BlogPreviewColumn>
    </Container>
  );
};

export default BlogListPage;

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const BlogListColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const BlogPreviewColumn = styled.div`
  flex: 2;
  background: #fafafa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const BlogCard = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.3rem;
`;

const CardMeta = styled.small`
  color: #888;
`;

const CardExcerpt = styled.p`
  margin-top: 0.5rem;
  color: #555;
`;

const BlogDetail = styled.div`
  // Removed background-color: red
`;

const DetailTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const DetailMeta = styled.small`
  color: #666;
  display: block;
  margin-bottom: 1rem;
`;

const DetailContent = styled.p`
  margin-top: 1rem;
  line-height: 1.6;
  color: #333;
`;

const DetailImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const EditButtonLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #218838;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ff0008;
  color: white;
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;
