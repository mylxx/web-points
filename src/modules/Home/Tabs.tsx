'use client';

export default function Tabs() {
  type LinkItem = {
    path?: string;
    target?: string;
    params?: { [key: string]: string };
  };

  type TabsItem = {
    [key: string]: string;
  };
  const tabs: TabsItem[] = [
    {
      name: 'My Points',
    },
    {
      name: 'PIDS',
      path: 'www.baidu.com',
      target: '_blank',
    },
    {
      name: 'Vouchers',
      path: 'www.baidu.com',
      target: '_blank',
    },
    {
      name: 'Identify Verification',
      path: 'www.baidu.com',
      target: '_blank',
    },
    {
      name: 'Offers',
      path: 'www.baidu.com',
      target: '_blank',
    },
  ];
  const goOtherPage = (item: LinkItem) => {
    if (!item.path) return;
    if (item.target === '_blank') {
      return window.open(item.path, item.target);
    }
    window.location.href = item.path;
  };
  return (
    <div className="flex gap-[30px] overflow-scroll flex-nowrap pc-mb-[30px] mobile:pb-[8px] mobile:mb-[40px]">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer text-nowrap pc:text-[24px] mobile:text-[21px] ${index == 0 ? 'text-titleText font-600' : 'text-[#454549]'}`}
          onClick={() => goOtherPage(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
