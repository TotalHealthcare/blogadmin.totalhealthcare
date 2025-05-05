import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./features/blog/components/Navbar";
import BlogListPage from "./features/blog/pages/BlogListPage";
import ListPage from "./features/blog/pages/ListPage";
import BlogDetailPage from "./features/blog/pages/BlogDetailPage";
import CreateBlogPage from "./features/blog/pages/CreateBlogPage";
import EditBlogPage from "./features/blog/pages/editBlogPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import { AuthProvider } from "./context/authContext";
import "./utils/axiosConfig";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Navbar />
          <div style={{ marginTop: "60px" }}>
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route
                path="/blog"
                element={
                  <ProtectedRoute>
                    <BlogListPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/blogs/:id" element={<BlogDetailPage />} />
              <Route
                path="/blogs/create"
                element={
                  <ProtectedRoute>
                    <CreateBlogPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs/:slug/edit"
                element={
                  <ProtectedRoute>
                    <EditBlogPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
