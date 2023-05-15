import { ReqBody } from "@lib/interface/auth";

export type AuthType = "login" | "signup";

export type RequestType = AuthType | "refresh";

export type LoginSource = "Google" | "FirstParty";

export type SignupResStatusCode = 200 | 400 | 409 | 500;
export type LoginResStatusCode = SignupResStatusCode | 401;
export type RefreshTokenStatusCode = 200 | 401 | 400 | 500;

export type StatusCode<T extends RequestType> = T extends "login"
  ? LoginResStatusCode
  : T extends "signup"
  ? SignupResStatusCode
  : RefreshTokenStatusCode;

export type ErrorMessage<T extends RequestType> = Record<
  Exclude<StatusCode<T>, 200>,
  string
>;

export type LoginReqBody<T extends LoginSource> = {
  [k in keyof Omit<
    ReqBody<T>,
    T extends "Google" ? "password" | "username" : "username"
  >]: ReqBody<T>[k];
};

export type SignupReqBody<T extends LoginSource> = {
  [k in keyof Omit<
    ReqBody<T>,
    T extends "Google" ? "password" : ""
  >]: ReqBody<T>[k];
};
