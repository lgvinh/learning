import React from 'react';
import EffectiveKit from './components/EffectiveKit';
import GoodKit from './components/GoodKit';
import IncludeKit from './components/IncludeKit';
import PrepareInterview from './components/PrepareInterview';
import TrackScorecards from './components/TrackScorecards';

const InterviewKit = () => (
  <>
    <main id="interview-kit">
      <EffectiveKit />
      <GoodKit />
      <IncludeKit />
      <PrepareInterview />
      <TrackScorecards />
    </main>
  </>
);

export default InterviewKit;
