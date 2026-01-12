import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsById } from "../services/news.api";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaUser, 
  FaTag,
  FaEye,
  FaShareAlt,
  FaBookmark,
  FaNewspaper
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const NewsDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const data = await getNewsById(id);

        if (!data) {
          setNews(null);
          return;
        }

        setNews(data);
        
        // Check if bookmarked (mock check)
        const bookmarks = JSON.parse(localStorage.getItem('news_bookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(id));
      } catch (err) {
        console.error(err);
        setError("Failed to load news detail");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('news_bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter(bookmarkId => bookmarkId !== id);
      localStorage.setItem('news_bookmarks', JSON.stringify(newBookmarks));
    } else {
      bookmarks.push(id);
      localStorage.setItem('news_bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        text: news?.content?.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
            <Link
              to="/news"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaNewspaper className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">News Not Found</h3>
            <p className="text-gray-600 mb-6">
              The news article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Browse All News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors text-gray-700"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={news.image || "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full inline-flex items-center gap-1">
                  <FaTag className="w-3 h-3" />
                  {news.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full inline-flex items-center gap-1">
                  <FaEye className="w-3 h-3" />
                  {Math.floor(Math.random() * 1000) + 500} views
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{news.title}</h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 md:gap-6 items-center mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{news.author}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {new Date(news.createdAt).toLocaleDateString("en-US", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-500">Published Date</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={handleBookmark}
                  className={`p-3 rounded-full border ${
                    isBookmarked 
                      ? "bg-blue-100 border-blue-200 text-blue-600" 
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  } transition-colors`}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
                >
                  <FaBookmark className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  title="Share this article"
                >
                  <FaShareAlt className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {news.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </article>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  {news.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  News
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  Article
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  Latest
                </span>
              </div>
            </div>

            {/* User Role Info */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                    <FaUser className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Reading as: <span className="capitalize text-blue-700">{user?.role || 'Guest'}</span></p>
                    <p className="text-sm text-gray-600">
                      {user?.role === 'admin' ? 'You have full access to manage this content' :
                       user?.role === 'user' ? 'You can read and interact with this content' :
                       'You have limited access to view this content'}
                    </p>
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <Link
                    to={`/admin/news/edit/${id}`}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Article
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles (Placeholder) */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for related articles */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;