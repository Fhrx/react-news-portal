import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminCreateNews from "./pages/AdminCreateNews";
import AdminEditNews from "./pages/AdminEditNews";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* USER */}
      <Route element={<UserLayout />}>
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />
        <Route path="/admin/news/create" element={<AdminCreateNews />} />
        <Route path="/admin/news/edit/:id" element={<AdminEditNews />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;