// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaEnvelope, 
  FaLock, 
  FaArrowRight, 
  FaUserCog, 
  FaUser, 
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaChartLine,
  FaCog,
  FaNewspaper,
  FaSignInAlt,
  FaInfoCircle
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { login, quickLogin } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = login(email, password);
      
      if (result.success) {
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/news");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (role) => {
    const user = quickLogin(role);
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/news");
      }
    }
  };

  const handleDemoLogin = (demoType) => {
    if (demoType === "admin") {
      setEmail("admin@newsportal.com");
      setPassword("admin123");
    } else if (demoType === "user") {
      setEmail("user@newsportal.com");
      setPassword("user123");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    { icon: <FaShieldAlt className="w-4 h-4" />, text: "Enterprise-grade security" },
    { icon: <FaUserCog className="w-4 h-4" />, text: "Role-based access control" },
    { icon: <FaChartLine className="w-4 h-4" />, text: "Real-time news monitoring" },
    { icon: <FaCog className="w-4 h-4" />, text: "Advanced news management" }
  ];

  const demoCredentials = [
    { 
      type: "admin", 
      email: "admin@newsportal.com", 
      password: "admin123", 
      name: "Admin Demo",
      description: "Full CRUD access + Dashboard",
      icon: <FaUserCog className="w-5 h-5" />,
      color: "blue"
    },
    { 
      type: "user", 
      email: "user@newsportal.com", 
      password: "user123", 
      name: "User Demo",
      description: "Read only + Filter/Search",
      icon: <FaUser className="w-5 h-5" />,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Full width background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 lg:p-12 xl:p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FaNewspaper className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">NewsPortal</span>
          </div>

          <div className="mt-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to NewsPortal
            </h1>
            <p className="text-blue-100 text-lg mb-10 max-w-md">
              Access your personalized dashboard with advanced news management, 
              real-time analytics, and role-based access control.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-blue-200">
                      {feature.icon}
                    </div>
                  </div>
                  <span className="text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-blue-200 text-sm">
          <p>© {new Date().getFullYear()} NewsPortal. All rights reserved.</p>
          <p className="mt-1 text-blue-300/70">Secure Authentication System</p>
        </div>
      </div>

      {/* Right Panel - Full width content area */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaNewspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">NewsPortal</span>
              <p className="text-gray-600 text-sm">Secure Authentication</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to your account
            </h2>
            <p className="text-gray-600">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Demo Quick Login */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaInfoCircle className="w-4 h-4 text-blue-600" />
              Quick Login (Demo)
            </h3>
            
            <div className="space-y-3">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDemoLogin(cred.type)}
                  className="w-full p-4 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cred.color === "blue" ? "bg-blue-100" : "bg-green-100"
                    }`}>
                      <div className={cred.color === "blue" ? "text-blue-600" : "text-green-600"}>
                        {cred.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{cred.name}</div>
                      <div className="text-sm text-gray-500">{cred.email}</div>
                      <div className="text-xs text-gray-400 mt-1">{cred.description}</div>
                    </div>
                  </div>
                  <FaArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-100/50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Note:</span> Click demo buttons to auto-fill form. Click "Sign In" to login.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaSignInAlt className="w-4 h-4 text-blue-600" />
              Sign in with credentials
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                By signing in, you agree to our{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/terms")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Terms
                </button>{" "}
                and{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/privacy")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>

          {/* Guest Access */}
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FaEye className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Guest Access</h4>
                  <p className="text-sm text-gray-600">Limited read-only access</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleQuickLogin("guest")}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-white transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/request-access")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Request access
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
              >
                ← Return to Homepage
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Contact administrator for new account registration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}