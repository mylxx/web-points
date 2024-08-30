import SVGWrapper from '@/components/SVGWrapper';
import NoData from '@/assets/images/common/NoData.svg';
import useTranslations from '@/hooks/useTranslations';
export default function DefDraw(props: { text?: string }) {
  const { text } = props;
  const { t } = useTranslations();
  return (
    <div className="flex items-center shrink-0 flex-col gap-[20px]">
      <SVGWrapper className="w-78 h-50">
        <NoData />
      </SVGWrapper>
      <span className="text-[18px] text-titleText">
        {text || t('common.table.noData')}
      </span>
    </div>
  );
}
