/* eslint-disable no-unused-vars */
import DOMPurify from "dompurify";
import React, { useState, useEffect } from "react";
import { useBlogs, useDeleteBlog } from "../hooks/useBlog";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data, isLoading, isError, error } = useBlogs(
    currentPage,
    itemsPerPage
  );

  const { blogs = [], total = 0, pages = 1 } = data || {};

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const { mutate: deleteBlog } = useDeleteBlog();

  useEffect(() => {
    if (blogs.length > 0) setSelectedBlog(blogs[0]);
  }, [blogs]);

  const handleDeleteClick = (slug) => {
    setBlogToDelete(slug);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteBlog(blogToDelete, {
      onSuccess: () => {
        if (selectedBlog?.slug === blogToDelete) {
          setSelectedBlog(
            blogs.find((blog) => blog.slug !== blogToDelete) || null
          );
        }
        setShowDeleteModal(false);
      },
    });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (isError) return <ErrorMessage>Error: {error.message}</ErrorMessage>;

  return (
    <Container>
      <BlogListColumn>
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            onClick={() => setSelectedBlog(blog)}
            active={selectedBlog?._id === blog._id}
          >
            <CardTitle>{blog.title}</CardTitle>
            <CardMeta>
              {typeof blog.author === "string" ? blog.author : "Unknown"} ·{" "}
              {new Date(blog.publishedAt).toDateString()}
            </CardMeta>
            <CardExcerpt>
              {blog.excerpt || stripHtml(blog.content).slice(0, 100)}...
            </CardExcerpt>
          </BlogCard>
        ))}

        <Pagination>
          <PaginationButton
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>

          {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
            <PaginationButton
              key={number}
              onClick={() => paginate(number)}
              active={number === currentPage}
            >
              {number}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pages}
          >
            Next
          </PaginationButton>
        </Pagination>
      </BlogListColumn>

      <BlogPreviewColumn>
        {selectedBlog ? (
          <BlogDetail>
            <DetailTitle>{selectedBlog.title}</DetailTitle>
            {selectedBlog.image ? (
              <DetailImage
                src={`http://localhost:3008${selectedBlog.image}`}
                alt={selectedBlog.title}
                onError={(e) => {
                  e.target.src = `https://picsum.photos/800/500?random=${selectedBlog._id}`;
                }}
              />
            ) : (
              <DetailImage
                src={
                  selectedBlog.image ||
                  `https://picsum.photos/800/500?random=${selectedBlog._id}`
                }
                alt="Default blog image"
              />
            )}
            <DetailMeta>
              {typeof selectedBlog.author === "object"
                ? selectedBlog.author.name
                : selectedBlog.author || "Unknown"}{" "}
              · {new Date(selectedBlog.createdAt).toDateString()}
            </DetailMeta>
            <DetailContent
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedBlog.content),
              }}
            />
          </BlogDetail>
        ) : (
          <EmptyPreview>Select a blog to preview</EmptyPreview>
        )}
      </BlogPreviewColumn>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </Container>
  );
};

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
  transition: all 0.3s;
  background-color: ${(props) => (props.active ? "#f0f7ff" : "white")};
  border-left: 4px solid
    ${(props) => (props.active ? "#2563eb" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.active ? "#f0f7ff" : "#f5f5f5")};
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

const BlogDetail = styled.div``;

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
  background-color: #f0f0f0;
  display: block;
`;

const EditButtonLink = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "#2563eb" : "white")};
  color: ${(props) => (props.active ? "white" : "#2563eb")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? "#2563eb" : "#f0f7ff")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: 2rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
`;

const EmptyPreview = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem 0;
`;

const stripHtml = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
export default ListPage;
