import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="vertical"
    background="white"
    className="track-real-time"
  >
    <div
      className="track-real-time--content"
    >
      <h4
        className="c-talents--title"
      >
        Track your offer in real time
      </h4>
      <p
        className="c-talents--content sync-g-suite--content"
      >
        From the moment you create your offer, to the moment you receive the
        candidate’s response - everything is updated in bravoTALENTS
        real-time. You don’t have to worry about missing out on questions or
        losing a precious candidate due to lack of communication.
      </p>
    </div>
    <figure>
      <img
        src="/images/talents/hire/trackRealTime.png"
        alt="communication"
      />
    </figure>
  </TalentContent>
);
