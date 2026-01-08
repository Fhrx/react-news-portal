import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsById } from "../services/news.api";

const NewsDetail = () => {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);

        const data = await getNewsById(id);

        if (!data) {
          setNews(null);
          return;
        }

        // ✅ DATA SUDAH NORMALIZED DARI API
        setNews(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail berita");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (error)
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );

  if (!news)
    return (
      <div className="p-6">
        Berita tidak ditemukan
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* BACK */}
      <Link
        to="/news"
        className="inline-block text-blue-600 hover:underline"
      >
        ← Kembali ke Berita
      </Link>

      {/* IMAGE */}
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-64 object-cover rounded"
      />

      {/* META */}
      <div className="space-y-2">
        <span className="text-sm text-gray-500">
          {news.category}
        </span>

        <h1 className="text-3xl font-bold">
          {news.title}
        </h1>

        <p className="text-sm text-gray-500">
          {new Date(news.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* CONTENT */}
      <div className="prose max-w-none">
        {news.content}
      </div>
    </div>
  );
};

export default NewsDetail;