import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import useNews from "../hooks/useNews";
import { useDebounce } from "../hooks/useDebounce";

import { filterBySearch, filterByCategory } from "../utils/filterNews";
import { sortNews } from "../utils/sortNews";
import { paginate } from "../utils/paginate";

import GuestBanner from "../components/common/GuestBanner";
import { useAuth } from "../context/AuthContext";

const News = () => {
  const { news, loading, error } = useNews();
  const { role } = useAuth();

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

  const paginatedNews = paginate(
    processedNews,
    currentPage,
    itemsPerPage
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6">
    {role === "guest" && <GuestBanner />}
      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-64"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="General">General</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="title_asc">Title A–Z</option>
          <option value="title_desc">Title Z–A</option>
        </select>
      </div>

      {/* NEWS LIST */}
      {paginatedNews.length === 0 ? (
        <div className="text-gray-500">No news found</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="border rounded overflow-hidden hover:shadow transition bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <span className="text-sm text-gray-500">
                  {item.category}
                </span>

                <h3 className="font-semibold line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default News;