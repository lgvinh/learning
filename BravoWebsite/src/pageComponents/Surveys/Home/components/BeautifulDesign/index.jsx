import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <TalentContent
    row="normal"
    type="horizontal"
    className="beautiful-design"
  >
    <section
      className="beautiful-design--container"
    >
      <h4
        className="beautiful-design__title c-talents--title"
      >
        Beautiful design
      </h4>
      <p
        className="beautiful-design__content c-talents--content"
      >
        Our gorgeous layout is designed to attract respondents and improve
        engagement for high response rates, collecting more in-depth data and
        better quality of the information returned.
      </p>
    </section>
    <figure
      className="beautiful-design__image"
    >
      <img
        src="/images/surveys/home/beautifulDesign.png"
        alt="Surveys made simple"
        className="beautiful-design__image--pc"
      />
      <img
        src="/images/surveys/home/beautifulDesign-mobile.png"
        alt="Surveys made simple"
        className="beautiful-design__image--mobile"
      />
    </figure>
  </TalentContent>
);
