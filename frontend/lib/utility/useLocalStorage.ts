export enum ItemKeys {
  oAuth_credential = "oAuth_credential",
}

export const getItem = (key: string): object | string | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
};

export const setItem = (key: string, item: unknown) => {
  if (!key) return;
  localStorage.removeItem(key);
  if (typeof item !== "string") localStorage.setItem(key, JSON.stringify(item));
  else localStorage.setItem(key, item);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearItem = () => {
  localStorage.clear();
};
