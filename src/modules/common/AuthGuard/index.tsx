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
import { INSIDE_LOGIN_VISIT_PATH } from '@/enums/site';
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

  useEffect(() => {
    const authToken = getLocalToken();
    // 测试
    // TODO: 修改
    setUserInfo({
      points: 10, //总积分
      user_id: '1829899987500474377', //用户ID
      user_name: null,
      open_id: 'txj_no1@163.com', //邮箱
      account_type: 'email', //账户类型
      create_date: '2024-08-31 23:46:44',
      update_date: '2024-09-01 00:01:41',
    });
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
    } else {
      setIsLogin(false);
    }
  }, [params]);

  useEffect(() => {
    if (isUnlogged) {
      if (INSIDE_LOGIN_VISIT_PATH.includes(pathname)) {
        replace('/login');
      }
    }
  }, [isUnlogged, locale, pathname]);

  return props.children;
}
