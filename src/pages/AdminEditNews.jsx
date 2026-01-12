import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/news.api";
import { 
  FaEdit, 
  FaArrowLeft, 
  FaSave, 
  FaTimes,
  FaImage,
  FaTag,
  FaHeading,
  FaFileAlt,
  FaUserEdit,
  FaCalendarAlt,
  FaSpinner
} from "react-icons/fa";

export default function AdminEditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "General",
    content: "",
    image: "",
    author: "",
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
          author: data.author || data.data?.author || "Admin",
          createdAt: data.createdAt || new Date().toISOString(),
        });
      } catch (err) {
        setError("Gagal memuat berita");
        console.error("Error loading news:", err);
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
    setIsSubmitting(true);

    try {
      await updateNews(id, form);
      navigate("/admin/news");
    } catch (err) {
      alert("Gagal mengupdate berita");
      console.error("Error updating news:", err);
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "General", label: "Umum" },
    { value: "Technology", label: "Teknologi" },
    { value: "Business", label: "Bisnis" },
    { value: "Sports", label: "Olahraga" },
    { value: "Entertainment", label: "Hiburan" },
    { value: "Health", label: "Kesehatan" },
    { value: "Education", label: "Pendidikan" },
    { value: "Politics", label: "Politik" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={() => navigate("/admin/news")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
        >
          <FaArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <FaTimes className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">{error}</h3>
          <p className="text-gray-600">Berita dengan ID {id} tidak ditemukan</p>
          <button
            onClick={() => navigate("/admin/news")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/news")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FaEdit className="text-blue-600" />
              Edit Berita
            </h1>
            <p className="text-gray-600 mt-1">
              Edit dan perbarui informasi berita
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="w-3 h-3" />
                {form.createdAt ? new Date(form.createdAt).toLocaleDateString('id-ID') : 'Tanggal tidak tersedia'}
              </span>
              <span className="flex items-center gap-1">
                <FaUserEdit className="w-3 h-3" />
                ID: {id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/50">
            <h2 className="text-lg font-semibold text-gray-900">
              Formulir Edit Berita
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Perbarui informasi berita yang ingin diubah
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaHeading className="w-4 h-4 text-blue-600" />
                Judul Berita
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Judul berita"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Author and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUserEdit className="w-4 h-4 text-blue-600" />
                  Penulis
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Nama penulis"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaTag className="w-4 h-4 text-blue-600" />
                  Kategori
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaImage className="w-4 h-4 text-blue-600" />
                URL Gambar
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              
              {/* Image Preview */}
              {form.image && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
                  <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                            <span class="text-gray-400 text-sm">Gambar tidak ditemukan</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaFileAlt className="w-4 h-4 text-blue-600" />
                Isi Berita
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={10}
                placeholder="Isi berita"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Pastikan konten berita berkualitas dan informatif
                </p>
                <span className={`text-xs ${form.content.length < 100 ? 'text-red-500' : 'text-green-500'}`}>
                  {form.content.length} karakter
                </span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/admin/news")}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <FaTimes className="w-4 h-4" />
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || form.content.length < 100}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting || form.content.length < 100
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <FaSave className="w-5 h-5" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/50">
            <h2 className="text-lg font-semibold text-gray-900">
              Preview Berita
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Tampilkan bagaimana berita akan terlihat setelah diedit
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-500 pl-4">
                {form.title || "Judul Berita"}
              </h3>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                {form.author && (
                  <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <FaUserEdit className="w-3 h-3" />
                    {form.author}
                  </span>
                )}
                {form.category && (
                  <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <FaTag className="w-3 h-3" />
                    {categories.find(c => c.value === form.category)?.label || form.category}
                  </span>
                )}
                {form.createdAt && (
                  <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                    <FaCalendarAlt className="w-3 h-3" />
                    {new Date(form.createdAt).toLocaleDateString('id-ID')}
                  </span>
                )}
              </div>

              {form.image && (
                <div className="relative h-48 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center">
                            <FaImage class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <span class="text-gray-400 text-sm">Gambar tidak tersedia</span>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              )}

              {form.content ? (
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {form.content.length > 300 ? `${form.content.substring(0, 300)}...` : form.content}
                  </div>
                  {form.content.length > 300 && (
                    <p className="text-sm text-gray-500 mt-2">
                      ...dan {form.content.length - 300} karakter lainnya
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FaFileAlt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Belum ada konten</p>
                </div>
              )}

              {/* Metadata */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Metadata</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-green-600">Aktif</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Terakhir Diubah</p>
                    <p className="font-medium">{new Date().toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Karakter</p>
                    <p className="font-medium">{form.content.length}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">ID Berita</p>
                    <p className="font-medium font-mono">{id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}