export interface AuthData {
  email: {
    isValid: boolean;
    value: string;
  };
  pwd: {
    isValid: boolean;
    value: string;
    isVisible: boolean;
  };
  account?: {
    isValid: boolean;
    value: string;
  };
}

export enum ActionType {
  EDIT_DATA = "EDIT_DATA",
  CLEAR_FIELD = "CLEAR_FIELD",
  TOGGLE_PWD_VISIBILITY = "TOGGLE_PWD_VISIBILITY",
}

export interface Action {
  type: ActionType;
  payload?: {
    type: keyof AuthData;
    value: string;
  };
}
