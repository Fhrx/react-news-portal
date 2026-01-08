import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">
        Halaman yang kamu cari tidak ditemukan
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}