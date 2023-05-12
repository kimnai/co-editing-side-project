import { KEY_FOR_LS } from "@lib/enum/auth";

export const useLocalStorage = () => {
  const setItem = (key: KEY_FOR_LS, data: object | string) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getItem = (key: KEY_FOR_LS) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item);
  };

  const removeItem = (...key: KEY_FOR_LS[]) => {
    for (const k of key) {
      localStorage.removeItem(k);
    }
  };

  const addItem = (key: KEY_FOR_LS, data: object) => {
    const item = getItem(key);

    if (item === null || item[Object.keys(data)[0]]) {
      setItem(key, data);
      return;
    }
    setItem(key, { ...item, ...data });
  };

  return { setItem, getItem, removeItem, addItem };
};
