import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import BlogListPage from "./features/blog/pages/BlogListPage";
import BlogDetailPage from "./features/blog/pages/BlogDetailPage";
import CreateBlogPage from "./features/blog/pages/CreateBlogPage";
// import EditBlogPage from "./features/blog/pages/EditBlogPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogListPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/blogs/create" element={<CreateBlogPage />} />
        {/* <Route path="/blogs/:id/edit" element={<EditBlogPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
