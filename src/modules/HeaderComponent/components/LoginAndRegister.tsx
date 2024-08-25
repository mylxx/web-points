import useTranslations from '@/hooks/useTranslations';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function LoginAndRegister(props: { className?: string }) {
  const { t } = useTranslations();
  const { clickMenuCallBack } = useHeaderConfig();
  return (
    <div className={`flex ${props.className}`}>
      <div
        onClick={() => clickMenuCallBack?.({ path: '/login' })}
        className="cursor-pointer common-hover-transition bg-backGround flex items-center justify-center pc:h-[46px] pc:px-[32px] pc:rounded-[12px] pc: text-[16px] mobile:px-[6px] mobile:h-[36px] mobile:rounded-[10px] mobile:text-[12px]"
      >
        {t('common.header.login')}
      </div>
    </div>
  );
}
