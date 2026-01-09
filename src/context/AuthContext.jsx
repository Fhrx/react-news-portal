// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const mockUsers = [
  { 
    id: 1, 
    username: "admin", 
    email: "admin@newsportal.com",
    password: "admin123", 
    role: "admin", 
    name: "Administrator",
    avatar: "👑"
  },
  { 
    id: 2, 
    username: "user", 
    email: "user@newsportal.com",
    password: "user123", 
    role: "user", 
    name: "Regular User",
    avatar: "👤"
  },
  { 
    id: 3, 
    username: "guest", 
    email: "", 
    password: "", 
    role: "guest", 
    name: "Guest Visitor",
    avatar: "👀"
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("newsportal_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("newsportal_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (emailOrUsername, password) => {
    // Quick login for demo (without password)
    if (emailOrUsername === "admin" && !password) {
      const adminUser = mockUsers.find(u => u.username === "admin");
      setUser(adminUser);
      localStorage.setItem("newsportal_user", JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    
    if (emailOrUsername === "user" && !password) {
      const userUser = mockUsers.find(u => u.username === "user");
      setUser(userUser);
      localStorage.setItem("newsportal_user", JSON.stringify(userUser));
      return { success: true, user: userUser };
    }

    // Normal login with credentials
    const foundUser = mockUsers.find(u => {
      // Check by username, email, or quick access
      const isUsernameMatch = u.username === emailOrUsername;
      const isEmailMatch = u.email === emailOrUsername;
      const isPasswordMatch = u.password === password;
      
      return (isUsernameMatch || isEmailMatch) && isPasswordMatch;
    });
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("newsportal_user", JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    
    return { success: false, message: "Invalid email/username or password" };
  };

  const quickLogin = (role) => {
    const foundUser = mockUsers.find(u => u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("newsportal_user", JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("newsportal_user");
    navigate("/");
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const getCurrentUser = () => {
    return user;
  };

  // Update user profile (for future features)
  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("newsportal_user", JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  };

  // Check if user can access admin features
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Check if user is guest (read-only)
  const isGuest = () => {
    return user?.role === "guest";
  };

  // Check if user is regular user
  const isRegularUser = () => {
    return user?.role === "user";
  };

  // Register new user (for future features)
  const register = (userData) => {
    // In a real app, this would call an API
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: "user" // Default role for new registrations
    };
    
    // Add to mock users (in real app, this would be saved to backend)
    mockUsers.push(newUser);
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem("newsportal_user", JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      login, 
      quickLogin, 
      logout,
      register,
      isAuthenticated,
      hasRole,
      getCurrentUser,
      updateProfile,
      isAdmin,
      isGuest,
      isRegularUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};