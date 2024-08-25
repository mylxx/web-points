import HowToGet from '@/modules/Home/HowToGet';
import MyPoints from '@/modules/Home/MyPoints';
import PointsInfo from '@/modules/Home/PointsInfo';
import Records from '@/modules/Home/Records';
function Home() {
  return (
    <div className="max-w-[1200px] box-border pc:px-[28px] pc:mx-auto pc:my-[159px] mobile:w-full mobile:px-[16px] mobile:my-[32px]">
      {/* <Tabs /> */}
      <div className="flex gap-[16px]">
        <div className="flex-1 self-start flex flex-col gap-[30px]">
          <MyPoints />
          <Records />
        </div>
        <div className="w-[35%] max-w-[436px] self-start flex flex-col gap-[30px]">
          <PointsInfo />
          <HowToGet />
        </div>
      </div>
    </div>
  );
}

export default Home;
