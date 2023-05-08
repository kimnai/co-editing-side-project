import { ErrorMessage } from "@lib/type/auth";

export const criteria = {
  email: {
    regex: /\w*@\w*.\w*/,
  },
  password: {
    minLength: 8,
  },
  username: {
    minLength: 5,
  },
};

export const authErrorResponse: Omit<ErrorMessage, 200> = {
  400: "Wrong email or password",
  401: "You don't have an account yet. Please sign up first",
  409: "You signed up with different source previously. Please log in with same source",
  500: "Internal server error occurred. Please contact us.",
};
