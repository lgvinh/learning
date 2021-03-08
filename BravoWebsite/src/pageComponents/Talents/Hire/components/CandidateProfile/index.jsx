import React from 'react';
import CommunicateCandidate from './components/CommunicateCandidate';
import CommunicateTeam from './components/CommunicateTeam';
import ProfilingProcess from './components/ProfilingProcess';
import TalentList from './components/TalentList';

const CandidateProfile = () => (
  <>
    <main
      id="candidate-profiles"
    >
      <ProfilingProcess />
      <CommunicateTeam />
      <CommunicateCandidate />
      <TalentList />
    </main>
  </>
);

export default CandidateProfile;
