import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/news.api";

export default function AdminEditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "General",
    content: "",
    image: "",
  });

  // 🔥 FETCH & ISI FORM
  useEffect(() => {
    async function load() {
      try {
        const data = await getNewsById(id);

        if (!data) {
          setError("Berita tidak ditemukan");
          return;
        }

        // ✅ PENTING: ISI STATE FORM
        setForm({
          title: data.title || data.name || "",
          category: data.category || data.data?.category || "General",
          content: data.content || data.data?.content || "",
          image: data.image || data.data?.image || "",
        });
      } catch (err) {
        setError("Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateNews(id, form);
      navigate("/admin/news");
    } catch (err) {
      alert("Gagal mengupdate berita");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul berita"
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="General">General</option>
        </select>

        {/* IMAGE */}
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL gambar"
          className="w-full border px-3 py-2 rounded"
        />

        {/* CONTENT */}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          placeholder="Isi berita"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/news")}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}