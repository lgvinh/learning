import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="vertical"
    background="white"
    id="work-tablet"
  >
    <div
      className="work-tablet--up"
    >
      <h4
        className="work-tablet--up--title c-talents--title"
      >
        Work from your own tablet
      </h4>
      <p
        className="work-tablet--up--content c-talents--content"
      >
        Stay connected with your hiring team by using bravoTALENTS.
        We have a responsive web app that works on any device.
        Now you can always check your process and are alerted with
        notifications every step on the road.
        Hiring decisions can be made on-the-go, and instant communication is fully supported.
      </p>
    </div>
    <figure
      className="work-tablet--up--down"
    >
      <img
        src="/images/talents/hire/workTablet.png"
        alt="communication"
      />
    </figure>
  </TalentContent>
);
