import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../services/news.api";

export default function AdminCreateNews() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "General",
    author: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNews(form);
    navigate("/admin/news");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Berita</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Judul berita"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="General">General</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
        </select>

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Isi berita"
          value={form.content}
          onChange={handleChange}
          rows={6}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}