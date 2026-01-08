import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews, deleteNews } from "../services/news.api";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      setNews(data);
    } catch (err) {
      setError("Gagal memuat berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus berita ini?"
    );
    if (!confirmDelete) return;

    await deleteNews(id);
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Kelola Berita</h1>

        <Link
          to="/admin/news/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tambah Berita
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Tidak ada data berita
                </td>
              </tr>
            )}

            {news.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3 space-x-3">
                  <Link
                    to={`/admin/news/edit/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}