export const useLocalStorage = () => {
  const getItem = (key: string): object | string | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  };

  const setItem = (key: string, item: string) => {
    localStorage.setItem(key, item);
  };

  const clearItem = () => {
    localStorage.clear();
  };

  return { getItem, setItem, clearItem };
};
