import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
  const [hasRun, setHasRun] = useState(false);
  const [width, setWidth] = useState(0);

  const handleWindowSizeChange = () => { setWidth(window.innerWidth); };

  useEffect(() => {
    if (!hasRun) {
      setHasRun(true);
      handleWindowSizeChange();
    }

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [hasRun]);

  return width <= 768;
};

export default useDeviceDetect;