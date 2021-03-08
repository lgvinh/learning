import React from 'react';
import { BravoCollapse, BravoTabs } from './components';
import { useDeviceDetect } from '../../../../hooks';

const HorizontalTab = () => {
  const isMobile = useDeviceDetect();

  return (
    <div
      id="vertical-tab"
    >
      <div
        className="vertical-tab-content"
      >
        {
          isMobile ? <BravoCollapse /> : <BravoTabs />
        }

      </div>
    </div>
  );
};

export default HorizontalTab;
