import { useAuth } from "../context/AuthContext";
import GuestBanner from "../components/common/GuestBanner";

export default function UserLayout({ children }) {
  const { isGuest } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {isGuest() && <GuestBanner />}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}