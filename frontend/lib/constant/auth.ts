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

export const signupErrorResponse: Omit<ErrorMessage, 200 | 401> = {
  400: "Invalid email or password",
  409: "An account with this email already existed",
  500: "Internal server error occurred. Please contact us.",
};

export const loginErrorResponse: Omit<ErrorMessage, 200> = {
  400: "Wrong email or password",
  401: "You don't have an account yet. Please sign up first",
  409: "You signed up with different source previously. Please log in with same source",
  500: "Internal server error occurred. Please contact us.",
};
