import React, { useMemo } from 'react';
import SVGWrapper from '@/components/SVGWrapper';
import AbleDown from '@/assets/images/markets/ableDown.svg';
import AbleUp from '@/assets/images/markets/ableUp.svg';
import DisableDown from '@/assets/images/markets/disableDown.svg';
import DisableUp from '@/assets/images/markets/disableUp.svg';
import { SortStatus } from '@/enums/table';

interface Props {
  status: SortStatus;
}
const size = 'w-[7px]';
export default function SortArrow(props: Props) {
  const currentArrows = useMemo(() => {
    const matchSortArrowObj = {
      [SortStatus.NORMAL]: { UpCom: <DisableUp />, DownCom: <DisableDown /> },
      [SortStatus.UP]: { UpCom: <AbleUp />, DownCom: <DisableDown /> },
      [SortStatus.DOWN]: { UpCom: <DisableUp />, DownCom: <AbleDown /> },
    };

    const { UpCom, DownCom } = matchSortArrowObj[props.status];

    return (
      <React.Fragment>
        <SVGWrapper className={`${size}`}>{UpCom}</SVGWrapper>
        <SVGWrapper className={`${size} mt-[1px]`}>{DownCom}</SVGWrapper>
      </React.Fragment>
    );
  }, [props.status]);

  return <div className="flex flex-col items-center">{currentArrows}</div>;
}
