import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="horizontal"
    background="lightBlue"
    id="communication"
  >
    <div
      className="communication--left"
    >
      <h4
        className="communication--left--title c-talents--title"
      >
        It’s time for real HR communication
      </h4>
      <p
        className="communication--left--content c-talents--content"
      >
        HR emails clogging up your inbox? Tired of waiting for feedback from your hiring
        managers? Communication flow stuck and you are not updated on the hiring process?
        Worry no more, since bravoTALENTS has got your back! Our collaborative tools make
        hiring an easier and more engaging process that are transparent and under control, so
        you are always up-to-date with your hiring process.
      </p>
      <div
        className="communication--left--functions"
      >
        <p className="communication--left--functions__title">Our functions:</p>
        <ul className="communication--left--functions__list">
          <li>Engage, communicate, take notes</li>
          <li>Keep track of hiring actions, tasks, and feedback</li>
          <li>Information is shared easily within the platform</li>
          <li>Monitor productivity and hiring process in real time</li>
        </ul>
      </div>
    </div>
    <figure
      className="communication--right"
    >
      <img
        src="/images/talents/hire/functions.png"
        alt="communication"
      />
    </figure>
  </TalentContent>
);
