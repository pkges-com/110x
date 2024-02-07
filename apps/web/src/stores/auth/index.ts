import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from './types';

interface AuthStore {
  // state
  user?: User;
  token?: string;

  // actions
  setUser: (user?: User) => void;
  setToken: (token?: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
