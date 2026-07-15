import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api/client';

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('oris_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('oris_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('oris_token', token);
    else localStorage.removeItem('oris_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('oris_user', JSON.stringify(user));
    else localStorage.removeItem('oris_user');
  }, [user]);

  const login = async (email: string, password: string) => {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
    } catch (err) {
      throw new Error(
        `Can't reach the server at ${API_BASE}. Make sure the backend is running and VITE_API_URL is set correctly.`
      );
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    setToken(data.token ?? null);
    setUser(data.user ?? null);
    navigate('/');
  };

  const register = async (name: string, email: string, password: string) => {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
    } catch (err) {
      throw new Error(
        `Can't reach the server at ${API_BASE}. Make sure the backend is running and VITE_API_URL is set correctly.`
      );
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    setToken(data.token ?? null);
    setUser(data.user ?? null);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
