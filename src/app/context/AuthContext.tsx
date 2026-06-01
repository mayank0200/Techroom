import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isPro: boolean;
  proExpiry?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem('techroom_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.proExpiry) {
          parsed.proExpiry = new Date(parsed.proExpiry);
        }
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user from local storage");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('techroom_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techroom_user');
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = {
        ...user,
        isPro: true,
        proExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };
      setUser(updatedUser);
      localStorage.setItem('techroom_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
