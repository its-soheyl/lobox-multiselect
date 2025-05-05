import { useEffect } from 'react';

const useOutSideClick = (handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [handler]);
};

export default useOutSideClick;
