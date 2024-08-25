'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { usePathname, useRouter } from '@/utils/navigation';
import { getLocalToken, setLocalToken } from '@/utils/tokenUtils';
import { getUserAccount } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';
import { AUTH_TOKEN_STORE_KEY, INSIDE_LOGIN_VISIT_PATH } from '@/enums/site';
import { loginState, unloggedInSelector, userInfoState } from '@/store';

interface AuthCheckerProps {}

export default function AuthGuard(props: PropsWithChildren<AuthCheckerProps>) {
  const params = useSearchParams();
  const setIsLogin = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const isUnlogged = useRecoilValue(unloggedInSelector);
  const { replace } = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const paramsWithoutAuthToken = new URLSearchParams(params.toString());
  paramsWithoutAuthToken.delete(AUTH_TOKEN_STORE_KEY);

  useEffect(() => {
    const authToken = params.get(AUTH_TOKEN_STORE_KEY) || getLocalToken();
    if (authToken) {
      setLocalToken(authToken);
      getUserAccount()
        .then((res) => {
          const { code } = res;
          if (code === RESPONSE_CODE.SUCCESS) {
            setUserInfo(res.data);
          }
          if (code !== RESPONSE_CODE.TOKEN_EXPIRED) {
            setIsLogin(true);
          } else {
            setIsLogin(false);
          }
        })
        .catch(() => {
          setIsLogin(false);
        });
      const href =
        paramsWithoutAuthToken.size > 0
          ? `${pathname}?${paramsWithoutAuthToken.toString()}`
          : pathname;
      replace(href);
    } else {
      setIsLogin(false);
    }
  }, [params]);

  useEffect(() => {
    if (isUnlogged) {
      if (INSIDE_LOGIN_VISIT_PATH.includes(pathname)) {
        replace('/');
      }
    }
  }, [isUnlogged, locale, pathname]);

  return props.children;
}
