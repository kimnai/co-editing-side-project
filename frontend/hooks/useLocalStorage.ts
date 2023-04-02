export enum ItemKeys {
  oAuth_credential = "oAuth_credential",
}

export const useLocalStorage = () => {
  const getItem = (key: string): string | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  };

  const setItem = (key: string, item: string) => {
    localStorage.setItem(key, item);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearItem = () => {
    localStorage.clear();
  };

  return { getItem, setItem, removeItem, clearItem };
};
