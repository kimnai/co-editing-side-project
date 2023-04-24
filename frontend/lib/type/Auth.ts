import { LoginData, SignUpData } from "@lib/interface/Auth";

export type LOGIN_SOURCE = "google" | "first_party";

export type AuthActionType =
  | "SET_EMAIL"
  | "SET_PASSWORD"
  | "SET_USER_NAME"
  | "VALIDATE"
  | "RESET";

export type FormState = {
  [k in keyof Omit<LoginData, "source">]: {
    value: string;
    isValid: boolean;
  };
} & {
  username?: {
    value: SignUpData["username"];
    isValid: boolean;
  };
};
