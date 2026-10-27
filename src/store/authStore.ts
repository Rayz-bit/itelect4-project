import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      login: (token, name) => set({ token, userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "itelect4-auth", // the localStorage key it writes to
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;