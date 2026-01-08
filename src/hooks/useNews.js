import { useEffect, useState } from "react";
import { fetchNews } from "../services/news.api";

export default function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchNews();
        setNews(data);
      } catch {
        setError("Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    news,
    loading,
    error,
  };
}
