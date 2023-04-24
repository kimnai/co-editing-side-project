export const useLocalStorage = () => {
  if (typeof window === "undefined") return;

  const getItem = (key: string): object | string | null => {
    const item = window.localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  };

  const setItem = (key: string, item: unknown) => {
    if (!key) return null;
    window.localStorage.removeItem(key);
    if (typeof item !== "string")
      window.localStorage.setItem(key, JSON.stringify(item));
    else localStorage.setItem(key, item);
  };

  const removeItem = (key: string) => {
    window.localStorage.removeItem(key);
  };

  const clearItem = () => {
    window.localStorage.clear();
  };

  return { setItem, getItem, removeItem, clearItem };
};
