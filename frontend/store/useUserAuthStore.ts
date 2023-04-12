import { UserInfo, UserState } from "@lib/interface/Auth";
import { create } from "zustand";

export const useUserAuthStore = create<UserState>((set) => ({
  loginInfo: {
    isGoogleLogin: false,
    isLoggedIn: false,
  },
  userInfo: {
    email: "",
    username: "",
    picture: "",
  },
  setLoginInfo: (info: UserState["loginInfo"]) =>
    set((state) => ({ loginInfo: info })),
  setUserInfo: (info: UserInfo) => set((state) => ({ userInfo: info })),
}));
