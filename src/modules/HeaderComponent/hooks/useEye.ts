import { useCallback, useEffect, useState } from 'react';

const LOCAL_EYE_STATUS = 'LOCAL_EYE_STATUS';

const useEye = () => {
  const [isHide, setIsHide] = useState(false);

  const toggleEye = useCallback((status?: string) => {
    if (status) {
      window.localStorage.setItem(LOCAL_EYE_STATUS, status);
      setIsHide(status === 'true');
    } else {
      setIsHide((pre) => {
        window.localStorage.setItem(LOCAL_EYE_STATUS, `${!pre}`);
        return !pre;
      });
    }
  }, []);

  useEffect(() => {
    const localHideStatus =
      window.localStorage.getItem(LOCAL_EYE_STATUS) || 'false';
    toggleEye(localHideStatus);
  }, [toggleEye]);

  return {
    isEyeHide: isHide,
    toggleEye,
  };
};

export default useEye;
