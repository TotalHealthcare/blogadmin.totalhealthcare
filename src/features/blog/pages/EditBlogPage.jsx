import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog, useUpdateBlog } from "../hooks/useBlog";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading } = useBlog(id);
  const { mutate: updateBlog, isLoading: isUpdating } = useUpdateBlog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // When the blog is fetched, pre-fill the form
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(
      { id, blogData: { title, content } },
      {
        onSuccess: () => {
          navigate(`/blogs/${id}`); // After updating, navigate back to blog detail
        },
      }
    );
  };

  if (isLoading) return <div>Loading blog...</div>;

  return (
    <div>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content:</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
          />
        </div>

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
