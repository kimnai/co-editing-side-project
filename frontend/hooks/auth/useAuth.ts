import { API_USER } from "@lib/api/Auth";
import { LoginData, SignUpData } from "@lib/interface/Auth";
import { axiosInstance } from "api";
import { useRouter } from "next/router";
import { useReducer } from "react";
import { useUserAuthStore } from "store/useUserAuthStore";
import { JwtPayload, decode } from "jsonwebtoken";
import { useLocalStorage } from "@hooks/utility/useLocalStorage";
import { AuthActionType, FormState, LOGIN_SOURCE } from "@lib/type/Auth";
import { AxiosResponse } from "axios";

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

interface Action {
  type: AuthActionType;
  payload?: string;
}

const reducer = (state: FormState, action: Action): FormState => {
  const value = action.payload;
  switch (action.type) {
    case "SET_EMAIL": {
      if (!value) return state;
      return { ...state, email: { value: value, isValid: false } };
    }

    case "SET_USER_NAME": {
      if (!value) return state;
      return { ...state, username: { value: value, isValid: false } };
    }

    case "SET_PASSWORD": {
      if (!value) return state;
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
      const usernameIsValid = !!username && username.trim().length >= 5;

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
  const localStorage = useLocalStorage()!;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setLoginInfo, setUserInfo, resetAll } = useUserAuthStore();
  const router = useRouter();

  const handleValidation = (): boolean => {
    dispatch({ type: "VALIDATE" });
    console.log(state);
    return Object.entries(state).every(([p, v]) => v.isValid);
  };

  const handleTransformState = (action: "login" | "signup") => {
    let body;
    if (action === "login") body = {} as LoginData;
    else body = {} as SignUpData;
    for (const [key, value] of Object.entries(state)) {
      body[key] = value.value;
    }

    if (action === "login") {
      body.source = "first_party";
    }
    return body;
  };

  const handleLoginResponse = async (
    res: AxiosResponse,
    source: LOGIN_SOURCE
  ) => {
    try {
      if (!res || !res?.data) throw new Error("Axios response error");
      const { access_token, refresh_token } = res.data;
      const decoded = decode(access_token) as JwtPayload;

      setLoginInfo({ isLoggedIn: true, isGoogleLogin: source === "google" });
      setUserInfo({
        username: decoded.username,
        email: decoded.email,
      });

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
        })
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitForm = async (action: "login" | "signup") => {
    const formIsValid = handleValidation();
    console.log(formIsValid, "submit");
    if (!formIsValid) return false;

    const body = handleTransformState(action);

    try {
      const res = await axiosInstance.post(
        action === "login" ? API_USER.LOGIN : API_USER.SIGNUP,
        body
      );

      if (action === "signup") {
        //display message and request login
        res.status === 200
          ? alert("Sign up successfully. You may try to login now")
          : alert("Something went wrong:(");

        return;
      }
      handleLoginResponse(res, "first_party");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    router.push("/user/login");
  };

  return {
    handleSubmitForm,
    dispatch,
    state,
    handleLogout,
    handleLoginResponse,
  };
};
