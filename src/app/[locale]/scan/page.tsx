import HowToEarn from '@/modules/HowToEarn';

export default function Connect() {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 60px)' }}
      className="pc:mx-[24px] mobile:mx-[12px]"
    >
      <div className="max-w-[1200px]  mx-auto">
        <HowToEarn />
      </div>
    </div>
  );
}
