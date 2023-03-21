import { useLogin } from "@hooks/useLogin";
import React, { createContext, PropsWithChildren, useState } from "react";

interface AccountStatus {
  isLoggedIn: boolean;
}

interface AccountContext extends AccountStatus {
  handleLogin: () => void;
  handleLogout: () => void;
  handleSignUp: () => void;
}

const defaultCtx: Partial<AccountContext> = {
  isLoggedIn: false,
};

export const AccountStatusContext = createContext(defaultCtx);

export const AccountStatusProvider: React.FC = (
  props: PropsWithChildren
): JSX.Element => {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const { state, dispatch } = useLogin();

  return (
    <AccountStatusContext.Provider value={{ isLoggedIn }}>
      {props.children}
    </AccountStatusContext.Provider>
  );
};
