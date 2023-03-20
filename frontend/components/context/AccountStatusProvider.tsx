import { useLogin } from "@hooks/useLogin";
import React, { createContext, useState } from "react";

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

export const AccountStatusProvider: React.FC = (props): JSX.Element => {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const { setEmail, setPwd } = useLogin();

  return (
    <AccountStatusContext.Provider value={{ isLoggedIn }}>
      {props.children}
    </AccountStatusContext.Provider>
  );
};
