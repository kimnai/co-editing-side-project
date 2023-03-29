import { useMutation } from "@tanstack/react-query";
import { ActionType } from "lib/enum/Auth";
import { Action, LoginData, SignUpData } from "lib/interface/Login";
import { ReducerAction, ReducerState, useReducer, useState } from "react";

const handleLogin = async () => {
  try {
    const res = await fetch("");
    if (!res.ok) throw new Error();
  } catch (error) {
    return Promise.reject("Something went wrong!");
  }
};

const initialState: SignUpData | LoginData = {
  account: "",
  email: "",
  pwd: "",
};

const reducer = (action: Action, state: SignUpData | LoginData) => {
  switch (action.type) {
    case ActionType.EDIT_ACCOUNT: {
      return { ...state, account: action.payload };
    }
    case ActionType.EDIT_EMAIL: {
      return { ...state, email: action.payload };
    }

    case ActionType.EDIT_PWD: {
      return { ...state, pwd: action.payload };
    }
    default:
      return state;
  }
};

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
  });

  return { state, dispatch };
};
