'use client';

import { useEffect, useState } from 'react';

export const useScreenChecker = () => {
  const [isPC, setIsPC] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(() => {
        const width = window.innerWidth;
        setIsPC(width >= 998);
        setIsPhone(width < 998);
      });
    });
    observer.observe(document.documentElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    isPC,
    isPhone,
  };
};
