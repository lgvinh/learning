import React from 'react';
import CustomizeNeeds from './components/CustomizeNeeds';
import CustomizeProcess from './components/CustomizeProcess';
import HiringProcess from './components/HiringProcess';
import Proactive from './components/Proactive';

const HiringPipline = () => (
  <>
    <main id="hiring-pipline">
      <HiringProcess />
      <CustomizeProcess />
      <CustomizeNeeds />
      <Proactive />
    </main>
  </>
);

export default HiringPipline;
