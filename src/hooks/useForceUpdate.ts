import { useState } from 'react';

export const useForceUpdate = () => {
  const [flag, setFlag] = useState(0);

  return {
    forceUpdate: () => {
      setFlag((flag) => flag + 1);
    },
    updateFlag: flag,
  };
};
