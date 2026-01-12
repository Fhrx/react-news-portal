import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../services/news.api";
import { 
  FaPlusCircle, 
  FaArrowLeft, 
  FaImage, 
  FaUserEdit,
  FaTag,
  FaHeading,
  FaFileAlt,
  FaSave,
  FaSpinner,
  FaCalendarAlt,
  FaTimes
} from "react-icons/fa";

export default function AdminCreateNews() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const newsData = {
        ...form,
        createdAt: new Date().toISOString(),
      };
      
      await createNews(newsData);
      navigate("/admin/news");
    } catch (error) {
      console.error("Error creating news:", error);
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
              <FaPlusCircle className="text-blue-600" />
              Buat Berita Baru
            </h1>
            <p className="text-gray-600 mt-1">
              Tambahkan berita baru ke platform NewsPortal
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="w-3 h-3" />
                {new Date().toLocaleDateString('id-ID')}
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
              Formulir Berita Baru
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Isi semua informasi yang dibutuhkan untuk berita baru
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
                name="title"
                placeholder="Masukkan judul berita yang menarik..."
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500">
                Judul harus deskriptif dan menarik perhatian pembaca
              </p>
            </div>

            {/* Author and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUserEdit className="w-4 h-4 text-blue-600" />
                  Penulis
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  placeholder="Nama penulis..."
                  value={form.author}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                name="image"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500">
                URL gambar yang valid untuk thumbnail berita
              </p>
              
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
                placeholder="Tulis isi berita di sini..."
                value={form.content}
                onChange={handleChange}
                rows={10}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 resize-none"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Minimal 100 karakter untuk konten yang berkualitas
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
                    Simpan Berita
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
              Tampilkan bagaimana berita akan terlihat untuk pengguna
            </p>
          </div>

          <div className="p-6">
            {form.title ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-500 pl-4">
                  {form.title}
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
                  <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                    <FaCalendarAlt className="w-3 h-3" />
                    {new Date().toLocaleDateString('id-ID')}
                  </span>
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
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Informasi</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium text-green-600">Baru</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Tanggal</p>
                      <p className="font-medium">{new Date().toLocaleDateString('id-ID')}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Karakter</p>
                      <p className="font-medium">{form.content.length}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Kategori</p>
                      <p className="font-medium">{form.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FaFileAlt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Isi form untuk melihat preview berita</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}