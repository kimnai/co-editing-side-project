export type AuthType = "login" | "signup";

export type LoginSource = "Google" | "FirstParty";

export type SignupResStatusCode = 200 | 400 | 409 | 500;

export type LoginResStatusCode = SignupResStatusCode | 401;

export type ErrorMessage = {
  [k in LoginResStatusCode]: string;
};
