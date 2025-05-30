export const EXPIRATION_TIME = 15 * 60 * 1000; 

export function saveWithExpiry(key, value) {
  const now = Date.now();
  const item = {
    value,
    expiry: now + EXPIRATION_TIME,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = Date.now();

  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
