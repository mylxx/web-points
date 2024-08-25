import { AUTH_TOKEN_STORE_KEY } from '@/enums/site';

export const getLocalToken = () => {
  return localStorage.getItem(AUTH_TOKEN_STORE_KEY);
};

export const setLocalToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_STORE_KEY, token);
};

export const removeLocalToken = () => {
  localStorage.removeItem(AUTH_TOKEN_STORE_KEY);
};
