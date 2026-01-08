import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="max-w-7xl mx-auto px-6 py-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}