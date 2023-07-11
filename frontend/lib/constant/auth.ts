import { ErrorMessage } from "@lib/type/auth";

export const criteria = {
  email: {
    regex: /\w*@\w*.\w*/,
    hint: "Email should only include letters and numbers",
  },
  password: {
    minLength: 8,
    hint: "Password length must be between 8 and 20",
  },
  username: {
    minLength: 5,
    hint: "Username length must be between 5 and 20",
  },
};

export const signupErrorResponse: ErrorMessage<"signup"> = {
  400: "Invalid email or password",
  409: "An account with this email already existed",
  500: "Internal server error occurred. Please contact us.",
};

export const loginErrorResponse: ErrorMessage<"login"> = {
  400: "Wrong email or password",
  401: "You don't have an account yet. Please sign up first",
  409: "You signed up with different source previously. Please log in with same source",
  500: "Internal server error occurred. Please contact us.",
};

//TODO: update error message once backend interface is established
export const refreshTokenErrorResponse: ErrorMessage<"refresh"> = {
  400: "Bad request",
  401: "Please log in first",
  500: "Internal server error",
};
