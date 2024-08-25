'use client';
import { memo } from 'react';

// 使用svg记得把颜色改成颜色变量
function SvgLoader(props: { src: string; width: number; height: number }) {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        display: 'inline-block',
      }}
      ref={(el) => {
        if (!el || !props.src || typeof window === 'undefined') return;
        fetch(props.src).then(async (res) => {
          if (res.ok) {
            el.innerHTML = await res.text();
          }
        });
      }}
    ></div>
  );
}
export default memo(SvgLoader);
