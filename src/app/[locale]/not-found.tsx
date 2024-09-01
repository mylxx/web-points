'use client';

import { Button } from 'antd';
import { useRouter } from '@/utils/navigation';
import useTranslations from '@/hooks/useTranslations';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  const { t } = useTranslations();
  const { push } = useRouter();

  return (
    <div className="py-[150px] flex flex-col items-center">
      <div className="text-[64px] leading-none text-titleText">
        {t('common.site.not_found.title')}
      </div>
      <div className="text-titleText text-[16px] leading-[27px]">
        {t('common.site.not_found.text')}
      </div>
      <Button
        className="mt-[32px] !h-[48px]"
        type="primary"
        onClick={() => push('/')}
      >
        <span className="font-700 text-[16px]">
          {t('common.site.not_found.button.label')}
        </span>
      </Button>
    </div>
  );
}
