import { ReqBody } from "@lib/interface/auth";

export type AuthType = "login" | "signup";

export type LoginSource = "Google" | "FirstParty";

export type SignupResStatusCode = 200 | 400 | 409 | 500;

export type LoginResStatusCode = SignupResStatusCode | 401;

export type ErrorMessage = {
  [k in LoginResStatusCode]: string;
};

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
