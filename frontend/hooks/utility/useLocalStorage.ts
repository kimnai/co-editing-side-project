export enum ItemKeys {
  oAuth_credential = "oAuth_credential",
}

export const useLocalStorage = () => {
  if (typeof window === undefined) return;

  const getItem = (key: string): object | string | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  };

  const setItem = (key: string, item: unknown) => {
    if (!key) return null;
    localStorage.removeItem(key);
    if (typeof item !== "string")
      localStorage.setItem(key, JSON.stringify(item));
    else localStorage.setItem(key, item);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearItem = () => {
    localStorage.clear();
  };

  return { setItem, getItem, removeItem, clearItem };
};
