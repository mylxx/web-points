'use client';

import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usePathname, useRouter } from '@/utils/navigation';
import { logOut } from '@/apis';
import { HEADER_HIDDEN_PATH } from '@/enums/site';
import {
  LinkToOtherSystem,
  NOT_STICKY_HEADERS_LIST,
  TRANSPARENT_HEADER_LIST,
} from '@/modules/Header/config';
import HeaderComponent from '@/modules/HeaderComponent';
import { loginState, userInfoState } from '@/store';

export default function Header(props: { locale?: I18N.LocaleType }) {
  const curPath = usePathname();

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const userInfo = useRecoilValue(userInfoState);
  const { push } = useRouter();

  const isTransparentBg = useMemo(() => {
    return TRANSPARENT_HEADER_LIST.includes(curPath);
  }, [curPath]);

  const isSticky = useMemo(() => {
    return !NOT_STICKY_HEADERS_LIST.includes(curPath);
  }, [curPath]);

  const logout = async () => {
    await logOut();
    setIsLogin(false);
    push('/');
  };

  const clickMenuCallBack = (props: {
    path?: string;
    target?: string;
    params?: { [key: string]: string };
  }) => {
    let searchStr = '';
    if (props.params) {
      searchStr = new URLSearchParams({ ...props.params }).toString();
    }
    const isBlankLink = props.target === '_blank';

    if (props.path) {
      if (isBlankLink) {
        return LinkToOtherSystem(props.path, props.target, searchStr);
      }
      return push(props.path);
    }

    let otherSystemLink = props.path || '/';

    LinkToOtherSystem(otherSystemLink, props.target, searchStr);
  };

  if (HEADER_HIDDEN_PATH.includes(curPath)) {
    return null;
  }

  return (
    <HeaderComponent
      sticky={isSticky}
      isTransparentBg={isTransparentBg}
      isLogin={isLogin}
      userInfo={userInfo}
      logout={logout}
      locale={props.locale}
      clickMenuCallBack={clickMenuCallBack}
    ></HeaderComponent>
  );
}
