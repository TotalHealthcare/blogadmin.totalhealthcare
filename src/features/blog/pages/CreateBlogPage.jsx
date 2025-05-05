import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../hooks/useBlog";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

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

const TiptapContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
`;

const TiptapToolbar = styled.div`
  background: #f5f5f5;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap;

  button {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
      background: #eee;
    }

    &.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
  }
`;

const TiptapEditorContent = styled(EditorContent)`
  padding: 1rem;
  min-height: 200px;

  &:focus {
    outline: none;
  }

  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <TiptapToolbar>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        List
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              editor
                .chain()
                .focus()
                .setImage({ src: event.target.result })
                .run();
            };
            reader.readAsDataURL(file);
          }
        }}
        style={{ display: "none" }}
        id="editor-image-upload"
      />
      <button
        type="button"
        onClick={() => document.getElementById("editor-image-upload").click()}
      >
        Image
      </button>
    </TiptapToolbar>
  );
};

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const { mutate: createBlog, isLoading, isError, error } = useCreateBlog();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "blog-image",
        },
      }),
      Placeholder.configure({
        placeholder: "Write your amazing blog post here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB");
        return;
      }
      setCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editor) {
      toast.error("Editor is not ready");
      return;
    }

    const htmlContent = editor.getHTML();
    if (htmlContent === "<p></p>") {
      toast.error("Please add some content");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", htmlContent);

    if (coverImage) {
      formData.append("image", coverImage);
    }

    const toastId = toast.loading("Creating your blog post...");
    createBlog(formData, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success("Blog post created successfully!");
        navigate("/blog");
      },
      onError: (error) => {
        toast.dismiss(toastId);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to create blog post"
        );
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

        <label>Content</label>
        <TiptapContainer>
          <MenuBar editor={editor} />
          <TiptapEditorContent editor={editor} />
        </TiptapContainer>

        <label htmlFor="coverImage">Cover Image (optional)</label>
        <TitleInput
          type="file"
          id="coverImage"
          onChange={handleImageChange}
          accept="image/png, image/jpeg, image/webp"
          aria-describedby="imageHelp"
        />
        {imagePreview && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Blog"}
        </Button>
        {isError && <ErrorMessage>Error: {error.message}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default CreateBlogPage;
