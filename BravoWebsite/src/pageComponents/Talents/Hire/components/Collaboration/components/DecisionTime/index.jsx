import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="lightBlue"
      id="decision-time"
    >
      <div
        className="decision-time--up"
      >
        <h4
          className="decision-time--up--title c-talents--title"
        >
          Don’t miss out on decision time!
        </h4>
        <p
          className="decision-time--up--content c-talents--content"
        >
          All your team’s communication can be found on your bravoTALENTS account in real time.
          You won’t be missing out on any task or step of the hiring process.
          We make sharing information easy.
        </p>
      </div>
      <figure
        className="decision-time--up--down"
      >
        <img
          src="/images/talents/hire/decisionTime.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
