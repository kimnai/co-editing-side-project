import { LOGIN_SOURCE } from "@lib/type/Auth";

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface DecodedAccessToken {
  username: string;
  email: string;
  exp: number;
}

export interface LoginData {
  email: string;
  password: string;
  source: LOGIN_SOURCE;
}

export interface SignUpData extends Omit<LoginData, "source"> {
  username: string;
}

export interface UserInfo extends Omit<SignUpData, "password"> {
  picture?: string;
}

export interface UserState {
  loginInfo: {
    isLoggedIn: boolean;
    isGoogleLogin: boolean;
  };
  userInfo: UserInfo;
  setLoginInfo: (info: UserState["loginInfo"]) => void;
  setUserInfo: (info: UserInfo) => void;
  resetAll: () => void;
}
