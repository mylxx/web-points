import HowToGet from '@/modules/Home/HowToGet';
import MyPoints from '@/modules/Home/MyPoints';
import PointsInfo from '@/modules/Home/PointsInfo';
import Records from '@/modules/Home/Records';
function Home() {
  return (
    <div className="max-w-[1200px] pc:px-[28px] pc:mx-auto pc:my-[159px] mobile:w-full mobile:px-[16px] mobile:my-[32px]">
      {/* <Tabs /> */}
      <div className="flex pc:gap-[16px] mobile:flex-col mobile:gap-[30px]">
        <div className="pc:flex-1 pc:self-start mobile:w-full flex flex-col gap-[30px]">
          <MyPoints />
          <div className="mobile:hidden">
            <Records />
          </div>
        </div>
        <div className="pc:w-[38%] pc:max-w-[436px] pc:self-start mobile:w-full flex flex-col gap-[30px]">
          <PointsInfo />
          <HowToGet />
          <div className="pc:hidden">
            <Records />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
