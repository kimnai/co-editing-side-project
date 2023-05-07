import { LoginSource } from "@lib/type/auth";

//Todo: make password optional
export interface LoginReqBody<T extends LoginSource> {
  email: string;
  password: T extends "Google" ? undefined : string;
  source: T;
}
