import React from 'react';
import CreateLetter from './components/CreateLetter';
import CraftLetter from './components/CraftLetter';
import TrackRealTime from './components/TrackRealTime';
import FinalizeOffer from './components/FinalizeOffer';

const OfferTracking = () => (
  <>
    <main id="offer-tracking">
      <CreateLetter />
      <CraftLetter />
      <TrackRealTime />
      <FinalizeOffer />
    </main>
  </>
);

export default OfferTracking;