import { useNavigate, Link } from "react-router-dom";
import { 
  FaHome, 
  FaNewspaper, 
  FaSearch, 
  FaExclamationTriangle,
  FaArrowLeft,
  FaUndo
} from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-blue-50 to-white">
      {/* Error Code */}
      <div className="relative mb-8">
        <div className="text-9xl font-bold text-gray-800 opacity-10 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaExclamationTriangle className="w-32 h-32 text-blue-600" />
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Sepertinya halaman yang kamu cari telah dipindahkan, dihapus, atau mungkin tidak pernah ada.
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Error 404 • Page Not Found
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full max-w-3xl">
        <button
          onClick={handleGoBack}
          className="group bg-white border border-blue-100 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md group-hover:scale-110 transition-transform">
            <FaUndo className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Kembali ke Halaman Sebelumnya</h3>
          <p className="text-sm text-gray-600">Navigasi kembali ke halaman sebelumnya yang dikunjungi</p>
        </button>

        <Link
          to="/"
          className="group bg-white border border-blue-100 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md group-hover:scale-110 transition-transform">
            <FaHome className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Kembali ke Home</h3>
          <p className="text-sm text-gray-600">Kembali ke halaman utama NewsPortal</p>
        </Link>

        <Link
          to="/news"
          className="group bg-white border border-blue-100 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md group-hover:scale-110 transition-transform">
            <FaNewspaper className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Lihat Berita</h3>
          <p className="text-sm text-gray-600">Jelajahi semua berita terbaru kami</p>
        </Link>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGoBack}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <FaUndo className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Halaman Sebelumnya</span>
        </button>

        <Link
          to="/"
          className="group flex items-center gap-3 px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
        >
          <FaHome className="w-5 h-5" />
          <span>Pergi ke Homepage</span>
        </Link>
      </div>

      {/* Help Text */}
      <div className="mt-12 pt-8 border-t border-blue-100 max-w-2xl">
        <p className="text-gray-500 text-sm mb-2">
          Butuh bantuan lebih lanjut?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
          <span>Pastikan URL yang dimasukkan sudah benar</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
          <span>Periksa koneksi internet Anda</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
          <span>Hubungi administrator jika diperlukan</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
            <FaNewspaper className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-blue-900">NewsPortal</span>
            <p className="text-sm text-blue-600">React News Platform</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} NewsPortal • Halaman 404
        </p>
      </footer>
    </div>
  );
}