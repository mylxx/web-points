'use client';

// import { useRecoilState, useRecoilValue } from 'recoil';
// import useTranslations from '@/hooks/useTranslations';
// import { loginState, userInfoState } from '@/store';
import SVGWrapper from '@/components/SVGWrapper';
import { useRouter } from '@/utils/navigation';
import RightArr from '@/assets/images/home/RightArr.svg';
import ScanToEarn from '@/assets/images/home/ScanToEarn.svg';

export default function HowToGet() {
  // const [isLogin] = useRecoilState(loginState);
  // const userInfo = useRecoilValue(userInfoState);
  // console.log(userInfo);
  // const { t } = useTranslations();
  const { push } = useRouter();

  type LinkItem = {
    path?: string;
    target?: string;
    title?: string;
    icon: any;
    self?: boolean;
  };

  const list = [
    {
      title: 'Scan to Earn',
      icon: <ScanToEarn />,
      path: '/scan',
      self: true,
    },
    {
      title: 'Staking',
      icon: <ScanToEarn />,
      target: '_blank',
      path: 'www.baidu.com',
    },
    {
      title: 'Apply VISA Master Card',
      icon: <ScanToEarn />,
      target: '_blank',
      path: 'www.baidu.com',
    },
  ];
  const jump = (item: LinkItem) => {
    if (!item.path) return;
    if (item.self) {
      push(item.path);
      return;
    }
    if (item.target === '_blank') {
      return window.open(item.path, item.target);
    }
    window.location.href = item.path;
  };
  return (
    <div className="w-full">
      <div className="px-[20px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        How to Get Points
      </div>
      <div className="flex flex-col gap-[10px]">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex cursor-pointer justify-between items-center bg-backGround pc:h-[100px] p-[20px] rounded-[16px] hover:bg-[#454549]"
            onClick={() => jump(item)}
          >
            <div className="flex items-center gap-[10px] flex-1">
              <SVGWrapper className="w-[42px] h-[42px]">{item.icon}</SVGWrapper>
              <div className="text-[18px] font-600 text-titleText">
                {item.title}
              </div>
            </div>
            <SVGWrapper className="h-[15px]">
              <RightArr />
            </SVGWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
