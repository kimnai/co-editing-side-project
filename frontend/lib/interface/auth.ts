import { LoginSource } from "@lib/type/auth";

export interface DecodedGoogleCredential {
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  name: string;
  iat: number;
  jti: string;
  nbf: number;
  picture: string;
}

export interface ReqBody<T> {
  username: string;
  email: string;
  password: string;
  source: T;
}

export interface LoginRes {
  access_token: string;
  error: string;
}

export interface DecodedAccessToken {
  username: string;
  email: string;
  //unix timestamp in second
  exp: number;
}

export interface UserInfo extends Omit<DecodedAccessToken, "exp"> {
  picture?: string;
  loginProvider: LoginSource;
}
