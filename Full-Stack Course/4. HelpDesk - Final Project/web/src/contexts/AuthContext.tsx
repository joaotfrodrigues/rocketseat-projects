import { useState, useEffect } from "react";
import { createContext } from "react";

import type { ReactNode } from "react";

import { api } from "../services/api";


type AuthContext = {
  isLoading: boolean
  session: null | UserAPIResponse
  save: (data: UserAPIResponse) => void
  remove: () => void
  refresh: (updatedUser: Partial<UserAPIResponse["user"]>) => void
}

const LOCAL_STORAGE_KEY = "@helpdesk";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setSession(data);
  }

  function remove() {
    setSession(null);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    window.location.assign("/");
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setSession({
        token,
        user: JSON.parse(user)
      });
    }

    setIsLoading(false);
  }

  function refresh(updatedUser: Partial<UserAPIResponse["user"]>) {
    if (!session) return;

    const newUser = { ...session.user, ...updatedUser };

    setSession({
      ...session,
      user: newUser,
    });

    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(newUser));
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, session, save, remove, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
