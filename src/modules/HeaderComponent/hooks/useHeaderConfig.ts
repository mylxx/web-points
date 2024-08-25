import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';

const useHeaderConfig = () => {
  return useContext(HeaderContext);
};

export default useHeaderConfig;
