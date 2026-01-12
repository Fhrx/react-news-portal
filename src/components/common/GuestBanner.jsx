import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaSignInAlt } from "react-icons/fa";

export default function GuestBanner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaInfoCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-800">
                You are browsing as <span className="font-semibold text-blue-700">Guest</span>. 
                Some features are limited. 
                <button 
                  onClick={() => navigate("/login")}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login for full access
                </button>
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSignInAlt className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}