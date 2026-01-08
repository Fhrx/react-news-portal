import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

import Welcome from "../pages/Welcome"
import Login from "../pages/Login"
import News from "../pages/News"
import NewsDetail from "../pages/NewsDetail"
import AdminDashboard from "../pages/AdminDashboard"
import AdminNews from "../pages/AdminNews"

import AdminCreateNews from "../pages/AdminCreateNews"
import AdminEditNews from "../pages/AdminEditNews"

const AppRouter = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            
            {/* ADMIN */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/news"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminNews />
                    </ProtectedRoute>
                }
            />


            // CREATE
            <Route
                path="/admin/news/create"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminCreateNews />
                    </ProtectedRoute>
                }
            />

            // EDIT
            <Route
                path="/admin/news/edit/:id"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminEditNews />
                    </ProtectedRoute>
                }
            />

            {/* NOT FOUND */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}

export default AppRouter