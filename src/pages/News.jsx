import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaCalendarAlt,
  FaUser,
  FaEye,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper,
  FaChartBar
} from "react-icons/fa";

import useNews from "../hooks/useNews";
import { useDebounce } from "../hooks/useDebounce";

import { filterBySearch, filterByCategory } from "../utils/filterNews";
import { sortNews } from "../utils/sortNews";
import { paginate } from "../utils/paginate";

import { useAuth } from "../context/AuthContext";

const News = () => {
  const { news, loading, error } = useNews();
  const { user, isGuest } = useAuth();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearch = useDebounce(search, 500);

  const processedNews = useMemo(() => {
    let data = filterBySearch(news, debouncedSearch);
    data = filterByCategory(data, category);
    data = sortNews(data, sort);
    return data;
  }, [news, debouncedSearch, category, sort]);

  const totalPages = Math.ceil(processedNews.length / itemsPerPage);
  const paginatedNews = paginate(processedNews, currentPage, itemsPerPage);

  const categories = ["all", ...new Set(news.map(item => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaNewspaper className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Error Loading News</h3>
            </div>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <div className="container mx-auto px-4 py-6">
        {/* Header dengan Search dan Stats sejajar */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Left: Page Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Latest News</h1>
              <p className="text-gray-600 text-sm">Browse and filter through our news collection</p>
            </div>

            {/* Right: Stats Cards */}
            <div className="flex gap-3">
              <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 min-w-[140px]">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaNewspaper className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{news.length}</p>
                  <p className="text-xs text-gray-600">Total News</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 min-w-[140px]">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 capitalize">{user?.role || "Guest"}</p>
                  <p className="text-xs text-gray-600">Your Role</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar Full Width */}
          <div className="mb-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news by title, content, or author..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaChartBar className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-900">Filters & Sorting</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <FaFilter className="w-3 h-3" />
                  <span>Category</span>
                </div>
              </label>
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white appearance-none text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== "all").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <FaSort className="w-3 h-3" />
                  <span>Sort By</span>
                </div>
              </label>
              <div className="relative">
                <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="pl-9 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white appearance-none text-sm"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title_asc">Title A–Z</option>
                  <option value="title_desc">Title Z–A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info & Clear Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 px-3 py-1 rounded text-sm">
                <span className="text-gray-600">
                  Showing <span className="font-semibold text-blue-700">{paginatedNews.length}</span> of{" "}
                  <span className="font-semibold text-blue-700">{processedNews.length}</span>
                </span>
              </div>
              
              {processedNews.length > 0 && (
                <div className="bg-green-50 px-3 py-1 rounded text-sm">
                  <span className="text-gray-600">
                    Page <span className="font-semibold text-green-700">{currentPage}</span> of{" "}
                    <span className="font-semibold text-green-700">{totalPages}</span>
                  </span>
                </div>
              )}
            </div>
            
            {(search || category !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* News Grid */}
        {paginatedNews.length === 0 ? (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaNewspaper className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
              {search || category !== "all" 
                ? "No news matches your search criteria." 
                : "There are no news articles available."}
            </p>
            {(search || category !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {paginatedNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        <span>{item.author}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaEye className="w-3 h-3" />
                        <span>Read more</span>
                      </div>
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <FaArrowRight className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-sm text-gray-600">
                    Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                    <span className="font-semibold text-gray-900">{totalPages}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-1.5 rounded border ${
                        currentPage === 1
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                      let page;
                      if (totalPages <= 5) {
                        page = idx + 1;
                      } else if (currentPage <= 3) {
                        page = idx + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + idx;
                      } else {
                        page = currentPage - 2 + idx;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded border flex items-center justify-center text-sm ${
                            currentPage === page
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-1.5 rounded border ${
                        currentPage === totalPages
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;