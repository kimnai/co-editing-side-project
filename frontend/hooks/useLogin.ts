import { Action, ActionType, AuthData } from "lib/interface/Login";
import { useReducer, useState } from "react";

export const handleSubmitLogin = (email: string, pwd: string) => {
  let emailIsValid = false;
  let pwdIsValid = false;

  if (email.match(/\w*\@gmail.com/)) emailIsValid = true;
  if (pwd.length >= 8 && pwd.match(/[!~@#$%^&*\w]/)) pwdIsValid = true;
  return { emailIsValid, pwdIsValid };
};

const initialState: AuthData = {
  account: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  pwd: {
    value: "",
    isValid: false,
    isVisible: false,
  },
};

const noValidInput = (input: string): boolean => {
  if (!input || input.trim().length === 0) return true;
  else return false;
};

const reducer = (state: AuthData, action: Action) => {
  switch (action.type) {
    case ActionType.EDIT_DATA: {
      if (!action.payload || noValidInput(action.payload?.value)) return state;

      const editingType = action.payload.type;

      return {
        ...state,
        [editingType]: { ...state[editingType], value: action.payload?.value },
      };
    }
    case ActionType.CLEAR_FIELD: {
      if (!action.payload?.type) return state;
      return { ...state, [action.payload.type]: "" };
    }
    case ActionType.TOGGLE_PWD_VISIBILITY: {
      return {
        ...state,
        pwd: { ...state.pwd, isVisible: !state.pwd.isVisible },
      };
    }
    default:
      return state;
  }
};

export const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch, handleSubmitLogin };
};
