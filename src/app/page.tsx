// import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  // 此处不能直接写redirect，否则打包 index.html 报错，重定向逻辑改为中间件执行
  // redirect('/en');
  return <></>;
}
