import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { User } from '../types';

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get<User>('/users/me');
      setUser(response.data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await api.post<{ token: string }>('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    await refreshUser();
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
