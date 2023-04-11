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
  picture: string;
}
export interface TokenInfo {
  isExpired?: boolean;
}

export interface UserState {
  isLoggedIn: boolean;
  isGoogleLogin: boolean;
  userInfo: UserInfo;
  tokenInfo: TokenInfo | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserInfo: (info: UserInfo) => void;
  setTokenInfo: (info: TokenInfo) => void;
}
