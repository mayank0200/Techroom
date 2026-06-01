import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
export function Root() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('techroom-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('techroom-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "mock_client_id"}>
      <AuthProvider>
        <ThemeContext.Provider value={{ dark, setDark }}>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeContext.Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
