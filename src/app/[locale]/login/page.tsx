import NoSSR from '@/components/NoSSR';
import Login from '@/modules/Connect/Login';

export default function Connect() {
  return (
    <div
      style={{ height: `calc(100vh - 60px)` }}
      className="flex pc:items-center justify-center w-[full] mobile:px-[12px] mobile:mt-[110px] mobile:!h-auto"
    >
      <NoSSR>
        <Login />
      </NoSSR>
    </div>
  );
}
