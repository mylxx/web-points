'use client';

import { useEffect, useState } from 'react';

export const useScreenChecker = () => {
  const [isPC, setIsPC] = useState(false);
  const [isPad, setIsPad] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(() => {
        const width = window.innerWidth;
        setIsPC(width >= 1280);
        setIsPad(width >= 768 && width < 1280);
        setIsPhone(width < 768);
      });
    });
    observer.observe(document.documentElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    isPC,
    isPad,
    isPhone,
  };
};
