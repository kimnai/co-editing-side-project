import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type AsideStatus = "open" | "close" | "hover";

const defaultCtx: {
  status: AsideStatus;
  handleClick?: () => void;
  setStatus?: Dispatch<SetStateAction<AsideStatus>>;
} = {
  status: "open",
};

export const AsideCtx = createContext(defaultCtx);

export const AsideStatusProvider: React.FC = (props): JSX.Element => {
  const [status, setStatus] = useState<AsideStatus>("open");

  const handleClick = () => {
    if (status === "open") setStatus("close");
    else setStatus("open");
  };

  return (
    <AsideCtx.Provider value={{ status, handleClick, setStatus }}>
      {props.children}
    </AsideCtx.Provider>
  );
};
