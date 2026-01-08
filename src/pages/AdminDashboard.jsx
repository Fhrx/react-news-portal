import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews } from "../services/news.api";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllNews();
      setNews(data);
      setLoading(false);
    }
    load();
  }, []);

  const stats = useMemo(() => {
    if (news.length === 0) {
      return {
        totalNews: 0,
        totalCategories: 0,
        latest: null,
        oldest: null,
        latestFive: [],
      };
    }

    const categories = new Set(
      news.map((item) => item.category).filter(Boolean)
    );

    const sorted = [...news].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    return {
      totalNews: news.length,
      totalCategories: categories.size,
      latest: sorted[0],
      oldest: sorted[sorted.length - 1],
      latestFive: sorted.slice(0, 5),
    };
  }, [news]);

  if (loading)
    return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Total Berita"
          value={stats.totalNews}
        />
        <StatCard
          title="Kategori"
          value={stats.totalCategories}
        />
        <StatCard
          title="Berita Terbaru"
          value={stats.latest?.title || "-"}
        />
        <StatCard
          title="Berita Terlama"
          value={stats.oldest?.title || "-"}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Berita Terbaru
          </h2>
          <Link
            to="/admin/news"
            className="text-blue-600 hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm">
                Judul
              </th>
              <th className="p-3 text-left text-sm">
                Kategori
              </th>
              <th className="p-3 text-left text-sm">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {stats.latestFive.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">
                  {item.title}
                </td>
                <td className="p-3">
                  {item.category}
                </td>
                <td className="p-3">
                  <Link
                    to={`/admin/news/edit/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {stats.latestFive.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500"
                >
                  Belum ada berita
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* COMPONENT */
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <p className="text-xl font-bold mt-1 truncate">
        {value}
      </p>
    </div>
  );
}