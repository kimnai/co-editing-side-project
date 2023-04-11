import { UserState } from "@lib/interface/Auth";
import { create } from "zustand";

export const useUserAuthStore = create<UserState>((set) => ({
  isGoogleLogin: false,
  isLoggedIn: false,
  userInfo: {
    email: "",
    password: "",
    username: "",
  },
  setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn: isLoggedIn })),
}));
