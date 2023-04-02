import jwtDecode from "jwt-decode";
import { ItemKeys, useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { getItem } = useLocalStorage();

  const isBrowser = typeof window !== undefined;
  const credential = isBrowser ? getItem(ItemKeys.oAuth_credential) : null;
  const decoded = credential ? jwtDecode(credential) : null;

  return {};
};
