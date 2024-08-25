import { atom, selector } from 'recoil';
import { removeLocalToken } from '@/utils/tokenUtils';
import { UserInfo } from '@/types/user-info.type';

export const loginState = atom<boolean | undefined>({
  key: 'user/loginState',
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        // logout
        if (oldValue === true && newValue === false) {
          removeLocalToken();
        }
      });
    },
  ],
});

export const userInfoState = atom<UserInfo | undefined>({
  key: 'user/userInfo',
  default: undefined,
});

export const loggedInSelector = selector({
  key: 'user/loginState/loggedIn',
  get: ({ get }) => {
    const state = get(loginState);
    return state === true;
  },
});
export const unloggedInSelector = selector({
  key: 'user/loginState/unloggedIn',
  get: ({ get }) => {
    const state = get(loginState);
    return state === false;
  },
});

export const loginPendingSelector = selector({
  key: 'user/loginState/loginPending',
  get: ({ get }) => {
    const state = get(loginState);
    return state === undefined;
  },
});
