import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Action, ActionType, AuthData } from "lib/interface/Login";
import React, { Dispatch } from "react";
import classes from "@style/Login.module.css";

export const InputField: React.FC<{
  inputType: keyof AuthData;
  dispatch: Dispatch<Action>;
  pwdIsVisible?: boolean;
  state: AuthData;
}> = ({ inputType, dispatch, pwdIsVisible, state }): JSX.Element => {
  const getType = () => {
    if (inputType === "email") return inputType;
    if (inputType === "account") return "text";
    return pwdIsVisible ? "text" : "password";
  };

  return (
    <div>
      <label htmlFor={inputType}>
        {inputType === "pwd"
          ? "Password"
          : `${inputType.slice(0, 1).toUpperCase() + inputType.slice(1)}`}
      </label>
      <input
        name={inputType}
        type={getType()}
        value={state[inputType]!.value}
        onChange={(e) =>
          dispatch({
            type: ActionType.EDIT_DATA,
            payload: { value: e.target.value, type: inputType },
          })
        }
      />
      {inputType === "pwd" ? (
        <IconButton
          size="medium"
          onClick={() => dispatch({ type: ActionType.TOGGLE_PWD_VISIBILITY })}
          className={classes.iconBtn}
        >
          {pwdIsVisible ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
      ) : (
        <></>
      )}
    </div>
  );
};
