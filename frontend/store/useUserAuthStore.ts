import { TokenInfo, UserInfo, UserState } from "@lib/interface/Auth";
import { create } from "zustand";

export const useUserAuthStore = create<UserState>((set) => ({
  isGoogleLogin: false,
  isLoggedIn: false,
  userInfo: {
    email: "",
    username: "",
    picture: "",
  },
  tokenInfo: null,
  setIsLoggedIn: (isLoggedIn) => set((state) => ({ isLoggedIn: isLoggedIn })),
  setUserInfo: (info: UserInfo) => set((state) => ({ userInfo: info })),
  setTokenInfo: (info: TokenInfo) =>
    set((state) => ({
      tokenInfo: info,
    })),
}));
