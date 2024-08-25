import { UserInfo } from '../types/user-info.type';
export interface HeaderProps {
  username?: string;
  /** header主题  */
  theme?: 'dark' | 'light';
  /** isTransparentBg 是否展示透明背景色 */
  isTransparentBg?: boolean;
  /** header是否固定 */
  sticky?: boolean;
  /** 是否登录 */
  isLogin?: boolean;
  /** 用户信息 */
  userInfo?: UserInfo;
  /** 登录 */
  login?: () => void;
  /** 退出登录 */
  logout?: () => void;
  /** 点击菜单触发回调 */
  clickMenuCallBack?: (props: {
    path?: string;
    target?: string;
    params?: { [key: string]: any };
  }) => void;
  /** 当前多语言 */
  locale?: I18N.LocaleType;
  /** 改变多语言 */
  changeLanguage?: (lang: string) => void;
}
