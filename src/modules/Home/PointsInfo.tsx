'use client';
import React, { useState } from 'react';
import { useScreenChecker } from '@/hooks/useScreenChecker';
import useTranslations from '@/hooks/useTranslations';
import { Typography } from 'antd';
export default function PointsInfo() {
  const [expanded, setExpanded] = useState(false);
  const { isPC } = useScreenChecker();

  const { t } = useTranslations();
  const { Paragraph } = Typography
  return (
    <div className="w-full text-titleText">
      <div className="px-[20px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('points_polyflow_point_system')}
      </div>
      <div className="break-words bg-backGround  pc:min-h-[106px] p-[20px] rounded-[16px]">
        <Paragraph
          ellipsis={isPC && {
            rows: 3,
            expandable: 'collapsible',
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
            symbol: (val) => {
              console.log(val)
              return <span className='text-titleText'>{!val ? t('common.expand') : t('common.collapse')}</span>
            }
          }}
          className='mb-[0] text-descriptionText text-[14px] leading-[20px] '
        >
          {t('points_scan_to_earn_desc')}
        </Paragraph>
      </div>
    </div>
  );
}
