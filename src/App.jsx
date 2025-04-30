import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./features/blog/components/Navbar";
import BlogListPage from "./features/blog/pages/BlogListPage";
import BlogDetailPage from "./features/blog/pages/BlogDetailPage";
import CreateBlogPage from "./features/blog/pages/CreateBlogPage";
import EditBlogPage from "./features/blog/pages/editBlogPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
// import "./app.css";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div style={{ marginTop: "60px" }}>
          {" "}
          <Routes>
            <Route path="/" element={<BlogListPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/blogs/create" element={<CreateBlogPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blogs/:id/edit" element={<EditBlogPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
