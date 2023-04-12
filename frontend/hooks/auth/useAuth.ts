import { API_USER } from "@lib/api/Auth";
import { LoginData, SignUpData, Tokens } from "@lib/interface/Auth";
import { axiosReq } from "api";
import { useRouter } from "next/router";
import { FormEvent, useReducer } from "react";
import { useUserAuthStore } from "store/useUserAuthStore";
import { decode } from "jsonwebtoken";
import { setItem } from "@lib/utility/useLocalStorage";

type FormState = {
  [k in keyof LoginData]: {
    value: string;
    isValid: boolean;
  };
} & {
  username?: {
    value: SignUpData["username"];
    isValid: boolean;
  };
};

const initialState: FormState = {
  email: {
    value: "",
    isValid: false,
  },
  password: {
    value: "",
    isValid: false,
  },
};

type ActionType =
  | "SET_EMAIL"
  | "SET_PASSWORD"
  | "SET_USER_NAME"
  | "VALIDATE"
  | "RESET";

interface Action {
  type: ActionType;
  payload?: string;
}

const reducer = (state: FormState, action: Action) => {
  if (
    action.type !== "VALIDATE" &&
    (!action.payload || action.payload.trim().length === 0)
  )
    return state;
  const value = action.payload;
  switch (action.type) {
    case "SET_EMAIL": {
      return { ...state, email: { value: value, isValid: false } };
    }
    case "SET_USER_NAME": {
      return { ...state, username: { value: value, isValid: false } };
    }
    case "SET_PASSWORD": {
      return { ...state, password: { value: value, isValid: false } };
    }
    case "VALIDATE": {
      const email = state.email.value;
      const password = state.password.value;

      const emailRegex = /\w*@\w*.com/;
      const passwordRegex = /\W*/;

      const emailIsValid = emailRegex.test(email);
      const passwordIsValid =
        password.length >= 8 &&
        password.length <= 20 &&
        passwordRegex.test(password);

      if (!state.username)
        return {
          ...state,
          email: {
            ...state.email,
            isValid: emailIsValid,
          },
          password: { ...state.password, isValid: passwordIsValid },
        };

      const username = state.username?.value;
      const usernameIsValid = username && username.trim().length >= 5;

      return {
        ...state,
        email: {
          ...state.email,
          isValid: emailIsValid,
        },
        password: { ...state.password, isValid: passwordIsValid },
        username: { ...state.username, isValid: usernameIsValid },
      };
    }

    case "RESET": {
      return initialState;
    }

    default:
      return state;
  }
};

export const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setLoginInfo, setUserInfo } = useUserAuthStore();

  const handleValidation = (action: "login" | "signup"): boolean => {
    let formIsValid = false;

    formIsValid = Object.entries(state).every(([p, v]) => {
      if (action === "login") return p !== "username" && v.isValid;
      else return v.isValid;
    });

    return formIsValid;
  };

  const handleSubmitForm = async (action: "login" | "signup") => {
    const formIsValid = handleValidation(action);
    if (!formIsValid) return false;
    let body: object = {};

    const base = { email: state.email, password: state.password };
    if (action === "signup")
      body = Object.assign({ username: state.username }, base);

    try {
      const res = await axiosReq("POST", API_USER.LOGIN, body);
      if (!res) throw new Error(`Error occured`);

      const { data } = res;

      if (data.access_token) {
        const decoded = decode(data.access_token);

        setLoginInfo({ isLoggedIn: true, isGoogleLogin: false });
        setUserInfo({ username: decoded.username, email: decoded.email });

        setItem(
          "tokens",
          JSON.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSubmitForm, dispatch, state };
};
