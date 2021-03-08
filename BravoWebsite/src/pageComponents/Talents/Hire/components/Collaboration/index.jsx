import React from 'react';
import Communication from './components/Communication';
import DecisionTime from './components/DecisionTime';
import Hiring from './components/Hiring';
import HiringTeam from './components/HiringTeam';
import RightTalent from './components/RightTalent';
import WorkTablet from './components/WorkTablet';

const Collaboration = () => (
  <>
    <main
      id="collaboration"
    >
      <Hiring />
      <Communication />
      <WorkTablet />
      <DecisionTime />
      <HiringTeam />
      <RightTalent />
    </main>
  </>
);

export default Collaboration;
