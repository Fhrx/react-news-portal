import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews, deleteNews, resetToDefault } from "../services/news.api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaExclamationTriangle,
  FaTimes,
  FaCheck,
  FaNewspaper,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaDatabase
} from "react-icons/fa";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getAllNews();
      setNews(data);
      setFilteredNews(data);
      setSelectedItems([]); // Reset selected items
    } catch (err) {
      setError("Failed to load news");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by search
    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredNews(filtered);
  }, [search, categoryFilter, news]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirmDelete) return;

    try {
      await deleteNews(id);
      await fetchNews(); // Refresh data
    } catch (err) {
      alert("Failed to delete news");
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Delete all news one by one
      for (const item of news) {
        await deleteNews(item.id);
      }
      await fetchNews(); // Refresh data
      setShowDeleteAllConfirm(false);
      alert("All news deleted successfully!");
    } catch (err) {
      alert("Failed to delete all news");
      console.error(err);
    }
  };

  const handleResetToDefault = async () => {
    try {
      await resetToDefault();
      await fetchNews(); // Refresh data
      setShowResetConfirm(false);
      alert("News data reset to default successfully!");
    } catch (err) {
      alert("Failed to reset data");
      console.error(err);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredNews.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredNews.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedItems.length} selected news?`
    );
    if (!confirmDelete) return;

    try {
      for (const id of selectedItems) {
        await deleteNews(id);
      }
      await fetchNews(); // Refresh data
      alert(`${selectedItems.length} news deleted successfully!`);
    } catch (err) {
      alert("Failed to delete selected news");
      console.error(err);
    }
  };

  const categories = ["all", ...new Set(news.map(item => item.category))];

  if (loading) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaNewspaper className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Error Loading News</h3>
            </div>
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">News Management</h1>
              <p className="text-gray-600">Create, edit, and manage your news articles</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedItems.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FaTrash className="w-3 h-3" />
                  Delete Selected ({selectedItems.length})
                </button>
              )}
              
              <button
                onClick={() => setShowDeleteAllConfirm(true)}
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <FaExclamationTriangle className="w-3 h-3" />
                Delete All
              </button>
              
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaSync className="w-3 h-3" />
                Reset to Default
              </button>
              
              <Link
                to="/admin/news/create"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPlus className="w-3 h-3" />
                Create News
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <FaDatabase className="w-4 h-4 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{news.length}</p>
              </div>
              <p className="text-xs text-gray-600">Total News</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <FaFilter className="w-4 h-4 text-green-600" />
                <p className="text-2xl font-bold text-gray-900">{filteredNews.length}</p>
              </div>
              <p className="text-xs text-gray-600">Filtered</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <FaCheckCircle className={`w-4 h-4 ${selectedItems.length > 0 ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className="text-2xl font-bold text-gray-900">{selectedItems.length}</p>
              </div>
              <p className="text-xs text-gray-600">Selected</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <FaNewspaper className="w-4 h-4 text-purple-600" />
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <p className="text-xs text-gray-600">Categories</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mb-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <FaSearch className="w-3 h-3" />
                    Search News
                  </div>
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, content, or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <FaFilter className="w-3 h-3" />
                    Filter by Category
                  </div>
                </label>
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="pl-9 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white appearance-none text-sm"
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(cat => cat !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("all");
                    setSelectedItems([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={fetchNews}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  title="Refresh data"
                >
                  <FaSync className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {filteredNews.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaNewspaper className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No News Found</h3>
              <p className="text-gray-600 mb-4">
                {search || categoryFilter !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "No news articles available. Start by creating one or reset to default data!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/admin/news/create"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus className="w-3 h-3" />
                  Create Your First News
                </Link>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaSync className="w-3 h-3" />
                  Reset to Default Data
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filteredNews.length > 0 && selectedItems.length === filteredNews.length}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Author</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNews.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{item.title}</p>
                            <p className="text-xs text-gray-500 truncate">{item.content.substring(0, 60)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          item.category === "Tech" ? "bg-blue-100 text-blue-700" :
                          item.category === "Business" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <FaUser className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-700 truncate">{item.author}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span className="whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/news/${item.id}`}
                            target="_blank"
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/news/edit/${item.id}`}
                            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredNews.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredNews.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{news.length}</span> news articles
              {selectedItems.length > 0 && (
                <span className="ml-4">
                  • <span className="font-semibold text-blue-700">{selectedItems.length}</span> items selected
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={fetchNews}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-1"
              >
                <FaSync className="w-3 h-3" />
                Refresh
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-1"
              >
                <FaDatabase className="w-3 h-3" />
                Reset Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete All Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Delete All News</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">
                You are about to delete <span className="font-bold">{news.length}</span> news articles permanently. 
                All data including images and content will be removed.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteAllConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FaCheck className="w-4 h-4" />
                Delete All ({news.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset to Default Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 text-green-600 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaSync className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Reset to Default Data</h3>
                <p className="text-sm text-gray-600">Restore original 5 news articles</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm">
                This will restore all news data to the original 5 dummy articles. 
                <span className="font-bold"> Current data will be replaced.</span>
              </p>
              <p className="text-green-700 text-sm mt-2">
                • 5 default news articles<br/>
                • Original categories and content<br/>
                • Perfect for testing and development
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleResetToDefault}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaCheck className="w-4 h-4" />
                Reset Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}