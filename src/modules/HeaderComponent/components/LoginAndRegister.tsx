import { Button } from 'antd';
import useTranslations from '@/hooks/useTranslations';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function LoginAndRegister(props: { className?: string }) {
  const { t } = useTranslations();
  const { clickMenuCallBack } = useHeaderConfig();
  return (
    <div className={`flex gap-[16px] ${props.className}`}>
      <Button
        type="primary"
        ghost
        size="middle"
        className="flex-1 common-hover-transition"
        onClick={() => clickMenuCallBack?.({ path: '/login' })}
      >
        {t('common.header.login')}
      </Button>
    </div>
  );
}
