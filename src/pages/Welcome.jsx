import { Link } from "react-router-dom"
import { 
  FaNewspaper, 
  FaUserShield, 
  FaUser, 
  FaEye,
  FaReact,
  FaCode,
  FaRoute,
  FaDatabase,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaSort
} from "react-icons/fa"

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
              <FaNewspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-900">NewsPortal</span>
              <p className="text-sm text-blue-600">React News Platform</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <Link 
              to="/news" 
              className="text-gray-700 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
            >
              <FaNewspaper className="w-4 h-4" />
              <span>Berita</span>
            </Link>
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <FaUser className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Modern News Portal Platform
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              React <span className="text-blue-600">News</span> Portal
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Platform berita modern berbasis React dengan sistem role management untuk 
              Admin, User, dan Guest. Kelola dan nikmati berita dengan pengalaman terbaik.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                to="/login"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span>Get Started</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/news"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaNewspaper className="w-4 h-4" />
                <span>Browse News</span>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FaUserShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Role</h3>
              <p className="text-gray-600 mb-4">
                Akses penuh untuk membuat, mengedit, menghapus, dan mengelola semua berita di sistem.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Full CRUD Operations</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Admin Dashboard</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>News Management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FaUser className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">User Role</h3>
              <p className="text-gray-600 mb-4">
                Membaca berita dengan fitur lengkap: search, filter, sort, dan pagination.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FaSearch className="w-3 h-3 text-indigo-500" />
                  <span>Advanced Search</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FaFilter className="w-3 h-3 text-indigo-500" />
                  <span>Category Filter</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FaSort className="w-3 h-3 text-indigo-500" />
                  <span>Sorting & Pagination</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FaEye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guest Role</h3>
              <p className="text-gray-600 mb-4">
                Akses terbatas untuk membaca berita dengan banner informasi pembatasan fitur.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Read Only Access</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Limited Features</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Guest Banner</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Built With Modern Technologies
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaReact className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">React + Vite</h4>
                <p className="text-sm text-gray-600 text-center">Fast development and optimal performance</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaCode className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Tailwind CSS</h4>
                <p className="text-sm text-gray-600 text-center">Utility-first CSS framework</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaRoute className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">React Router</h4>
                <p className="text-sm text-gray-600 text-center">Client-side routing</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaDatabase className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">LocalStorage</h4>
                <p className="text-sm text-gray-600 text-center">Mock API & data persistence</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-16 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-blue-100">User Roles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4</div>
                <div className="text-blue-100">CRUD Operations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">React Based</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-blue-100">News Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Join the modern news platform experience. Create, manage, and read news with ease.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Start Your Journey</span>
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaNewspaper className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold">NewsPortal</span>
                <p className="text-sm text-gray-400">React News Platform</p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                Berita
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>React News Portal © {new Date().getFullYear()} - Built for modern web experience</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Welcome