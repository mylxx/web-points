'use client';

import { useRecoilValue } from 'recoil';
import useTranslations from '@/hooks/useTranslations';
import {
  unloggedInSelector,
  loggedInSelector,
  loginPendingSelector,
} from '@/store';

type TypeProps = {
  children: React.ReactNode;
};

const NoAuthCopyWrite = (props: TypeProps) => {
  // 被 访问的页面有登陆拦截, 有全局 路由警卫组件(AuthGuard) 做跳转 控制
  // 这里只做 已经跳转过来的页面的文案提示 (AuthGuard 跳转在 useEffect 里面，因为 effect 执行时机问题，肯定能访问到具体被拦截的页面，这里只是 做 文案提示)
  const unlogged = useRecoilValue(unloggedInSelector);
  const logged = useRecoilValue(loggedInSelector);
  const loginPending = useRecoilValue(loginPendingSelector);

  const { t } = useTranslations();
  return (
    <>
      {unlogged && (
        <div className="flex justify-center items-center min-h-[400px] text-[--title-text] text-fs16 atPhone:p-[40px]">
          {t('common.no_permission_page')}
        </div>
      )}
      {logged && props.children}
      {loginPending && (
        <div className="flex justify-center items-center min-h-[400px] text-[--title-text] text-fs16 atPhone:p-[40px]">
          {t('common.pendding_page')}
        </div>
      )}
    </>
  );
};

export default NoAuthCopyWrite;
