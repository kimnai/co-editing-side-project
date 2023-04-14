export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
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
