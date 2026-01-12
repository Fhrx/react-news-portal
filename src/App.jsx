import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import './App.css';

// Layouts - PASTIKAN IMPORT INI
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Public Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// User Pages
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminCreateNews from "./pages/AdminCreateNews";
import AdminEditNews from "./pages/AdminEditNews";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          
          {/* User Routes - PAKAI UserLayout */}
          <Route 
            path="/news" 
            element={
              <UserLayout>
                <News />
              </UserLayout>
            } 
          />
          <Route 
            path="/news/:id" 
            element={
              <UserLayout>
                <NewsDetail />
              </UserLayout>
            } 
          />
          
          {/* Admin Routes - PAKAI AdminLayout */}
          <Route 
            path="/admin" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin/news" 
            element={
              <AdminLayout>
                <AdminNews />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin/news/create" 
            element={
              <AdminLayout>
                <AdminCreateNews />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin/news/edit/:id" 
            element={
              <AdminLayout>
                <AdminEditNews />
              </AdminLayout>
            } 
          />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;