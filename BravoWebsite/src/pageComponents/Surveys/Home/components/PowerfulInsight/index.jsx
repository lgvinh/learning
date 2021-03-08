import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="horizontal"
    row="reverse"
    className="powerful-insights"
  >
    <section
      className="powerful-insights--container"
    >
      <h4
        className="powerful-insights__title c-talents--title"
      >
        Powerful insights in minutes
      </h4>
      <p
        className="powerful-insights__content c-talents--content"
      >
        Get your results analyzed in minutes with the newest business solution
        for gathering insights. Come up with rock-solid solutions for your
        business based on detailed survey reports, delivered instantly.
      </p>
    </section>
    <figure
      className="powerful-insights__image"
    >
      <img
        src="/images/surveys/home/powerfulInsight.png"
        alt="Surveys made simple"
        className="powerful-insights__image--pc"
      />
      <img
        src="/images/surveys/home/powerfulInsight-mobile.png"
        alt="Surveys made simple"
        className="powerful-insights__image--mobile"
      />
    </figure>
  </TalentContent>
);
