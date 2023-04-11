export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserState {
  isLoggedIn: boolean;
  isGoogleLogin: boolean;
  userInfo: {
    email: string;
    password: string;
    username: string;
  };
  tokens?: {
    exp: number;
    isExp: boolean;
  };
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface LoginData {
  email: string;
  pwd: string;
}

export interface SignUpData extends LoginData {
  account: string;
}
