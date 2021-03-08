import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="vertical"
    row="normal"
    className="survey-simple"
  >
    <section
      className="survey-simple--container"
    >
      <h4
        className="survey-simple__title"
      >
        Surveys made simple
      </h4>
      <p
        className="survey-simple__content"
      >
        Wondering what is the next big step for your business? Build your
        survey today to gather business influential data and information to
        help with making foolproof, critical decisions to drive growth.
      </p>
    </section>
    <figure
      className="survey-simple__image"
    >
      <img
        src="/images/surveys/home/simple.png"
        alt="Surveys made simple"
      />
    </figure>
  </TalentContent>
);
