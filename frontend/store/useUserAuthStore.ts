import { UserInfo, UserState } from "@lib/interface/Auth";
import { create } from "zustand";

const initialState = {
  loginInfo: {
    isGoogleLogin: false,
    isLoggedIn: false,
  },
  userInfo: {
    email: "",
    username: "",
    picture: "",
  },
};

export const useUserAuthStore = create<UserState>((set) => ({
  ...initialState,
  setLoginInfo: (info: UserState["loginInfo"]) =>
    set((state) => ({ loginInfo: info })),
  setUserInfo: (info: UserInfo) => set((state) => ({ userInfo: info })),
  resetAll: () => set((state) => ({ ...state, ...initialState })),
}));
