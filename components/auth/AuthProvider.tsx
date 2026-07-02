'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { apiFetch, clearToken, getToken, setToken, ApiError } from '@/lib/api';

/* ── Types ───────────────────────────────────────────────────────────────── */

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
  role: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
  date_of_birth: string; // YYYY-MM-DD
  nationality: string;
  country_of_residence: string;
};

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (input: SignupInput) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Provider ────────────────────────────────────────────────────────────── */

type AuthResponse = { success: boolean; token: string; user: AuthUser };
type VerifyResponse = { success: boolean; user: AuthUser };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // On mount: if a token is stored, verify it against the server.
  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token) {
      setHydrated(true);
      return;
    }
    apiFetch<VerifyResponse>('/api/auth/verify', { method: 'GET' })
      .then((res) => {
        if (cancelled) return;
        if (res?.success && res.user) setUser(res.user);
        else clearToken();
      })
      .catch(() => {
        if (!cancelled) clearToken();
      })
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login: AuthContextValue['login'] = async (email, password) => {
    try {
      const res = await apiFetch<AuthResponse>('/api/auth/login', {
        method: 'POST',
        json: { email: email.trim(), password },
        auth: false,
      });
      if (!res?.success || !res.token || !res.user) {
        return { ok: false, error: 'Login failed. Please try again.' };
      }
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    } catch (e) {
      const err = e as ApiError;
      return { ok: false, error: err.message || 'Login failed. Please try again.' };
    }
  };

  const signup: AuthContextValue['signup'] = async (input) => {
    if (!input.name.trim()) return { ok: false, error: 'Please enter your name.' };
    if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) {
      return { ok: false, error: 'Please enter a valid email.' };
    }
    if (input.password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }
    try {
      const res = await apiFetch<AuthResponse>('/api/auth/register', {
        method: 'POST',
        json: {
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          password: input.password,
          date_of_birth: input.date_of_birth,
          nationality: input.nationality.trim(),
          country_of_residence: input.country_of_residence.trim(),
        },
        auth: false,
      });
      if (!res?.success || !res.token || !res.user) {
        return { ok: false, error: 'Registration failed. Please try again.' };
      }
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    } catch (e) {
      const err = e as ApiError;
      return { ok: false, error: err.message || 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, hydrated, login, signup, logout }),
    [user, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
