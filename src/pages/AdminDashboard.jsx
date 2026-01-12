import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews } from "../services/news.api";
import { 
  FaChartBar, 
  FaListAlt, 
  FaTags, 
  FaCalendarAlt,
  FaNewspaper,
  FaEdit,
  FaEye,
  FaPlusCircle,
  FaClock
} from "react-icons/fa";

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
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Hitung berita per kategori
    const categoryCount = {};
    news.forEach(item => {
      if (item.category) {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
      }
    });

    return {
      totalNews: news.length,
      totalCategories: categories.size,
      latest: sorted[0],
      oldest: sorted[sorted.length - 1],
      latestFive: sorted.slice(0, 5),
      categoryCount,
      sorted,
    };
  }, [news]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaChartBar className="text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Kelola dan pantau semua berita di platform NewsPortal
          </p>
        </div>
        <Link
          to="/admin/news/create"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
        >
          <FaPlusCircle className="w-5 h-5" />
          <span className="font-medium">Tambah Berita</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaNewspaper className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-700">{stats.totalNews}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Total Berita</h3>
          <p className="text-sm text-gray-600">Jumlah berita dalam sistem</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaTags className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-700">{stats.totalCategories}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Kategori</h3>
          <p className="text-sm text-gray-600">Jumlah kategori berita</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaClock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-700 block">
                {stats.latest ? new Date(stats.latest.createdAt).toLocaleDateString('id-ID') : '-'}
              </span>
              <span className="text-xs text-gray-500">Terbaru</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Berita Terbaru</h3>
          <p className="text-sm text-gray-600 truncate">{stats.latest?.title || "Belum ada"}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FaCalendarAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-700 block">
                {stats.oldest ? new Date(stats.oldest.createdAt).toLocaleDateString('id-ID') : '-'}
              </span>
              <span className="text-xs text-gray-500">Terlama</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Berita Terlama</h3>
          <p className="text-sm text-gray-600 truncate">{stats.oldest?.title || "Belum ada"}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest News Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-blue-100 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaListAlt className="text-blue-600" />
                Berita Terbaru
              </h2>
              <p className="text-sm text-gray-600 mt-1">5 berita terbaru yang ditambahkan</p>
            </div>
            <Link
              to="/admin/news"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Lihat Semua
              <FaEye className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Judul</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100">
                {stats.latestFive.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 truncate max-w-[200px]">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                        {item.content.substring(0, 60)}...
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/news/${item.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Lihat"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/news/edit/${item.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {stats.latestFive.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center">
                      <div className="text-gray-400 mb-2">
                        <FaNewspaper className="w-12 h-12 mx-auto opacity-50" />
                      </div>
                      <p className="text-gray-500">Belum ada berita</p>
                      <Link
                        to="/admin/news/create"
                        className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <FaPlusCircle className="w-4 h-4" />
                        Buat berita pertama
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Stats */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaTags className="text-blue-600" />
              Statistik Kategori
            </h2>
            <p className="text-sm text-gray-600 mt-1">Distribusi berita per kategori</p>
          </div>

          <div className="p-6">
            {Object.keys(stats.categoryCount || {}).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(stats.categoryCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => {
                    const percentage = Math.round((count / stats.totalNews) * 100);
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{category}</span>
                          <span className="text-sm font-semibold text-blue-700">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <FaTags className="w-12 h-12 mx-auto opacity-50" />
                </div>
                <p className="text-gray-500">Belum ada kategori</p>
              </div>
            )}

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-3">Aksi Cepat</h3>
              <div className="space-y-2">
                <Link
                  to="/admin/news"
                  className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FaListAlt className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">Kelola Semua Berita</span>
                  </div>
                  <FaEye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link
                  to="/admin/news/create"
                  className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FaPlusCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">Tambah Berita Baru</span>
                  </div>
                  <FaPlusCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link
                  to="/news"
                  className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FaNewspaper className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">Lihat Berita Publik</span>
                  </div>
                  <FaEye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}