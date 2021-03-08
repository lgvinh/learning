import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="vertical"
    background="white"
    className="sync-g-suite"
  >
    <div>
      <h4
        className="c-talents--title"
      >
        Syncs with G Suite and O365
      </h4>
      <p
        className="c-talents--content sync-g-suite--content"
      >
        Our integrations with G Suite and O365 calendars makes the syncing
        process seamless. Now you can track every change occurring and it
        will be reflected on your calendar. Making a change can never be easier, with bravoTALENTS
      </p>
    </div>
    <figure>
      <img
        src="/images/talents/hire/syncGSuite.png"
        alt="communication"
      />
    </figure>
  </TalentContent>
);
