import React from 'react';
import SurveysTip from '../../../../../components/SurveysTip';

export default () => (
  <section className="example__wrapper">
    <h3 className="example__heading">
      Example of market research surveys
    </h3>
    <ul className="example__list">
      <li className="example__list-item">
        <section className="example__list-item-section">
          <img src="/images/surveys/market-research/example-1.png" alt="Consumer Feedback" className="example__item__image" />
          <h4 className="example__item__title">Consumer Feedback</h4>
          <p className="example__item__content">Your most valuable insight comes from your consumers. What do they want? What do they need? What do they expect? These questions should be answered before all else to make sure that your products/services are in demand and fit your consumers’ needs.</p>
        </section>
      </li>
      <li className="example__list-item">
        <section className="example__list-item-section">
          <img src="/images/surveys/market-research/example-2.png" alt="Product Feedback" className="example__item__image" />
          <h4 className="example__item__title">Product Feedback</h4>
          <p className="example__item__content">
            How is your product doing? How do you improve your products/services? This improves your reputation
            greatly as a business who cares about customers’ standards and opinions, as well as bettering your product quality according to your consumers’ values.
          </p>
        </section>
      </li>
      <li className="example__list-item">
        <section className="example__list-item-section">
          <img src="/images/surveys/market-research/example-3.png" alt="Trend Feedback" className="example__item__image" />
          <h4 className="example__item__title">Trend Feedback</h4>
          <p className="example__item__content">Understanding the on-going trend can help production and predict future trends. This maximizes your ROI and profits as a business and gains you an advantage against your competitors.</p>
        </section>
      </li>
      <li className="example__list-item">
        <section className="example__list-item-section">
          <img src="/images/surveys/market-research/example-4.png" alt="Concept Feedback" className="example__item__image" />
          <h4 className="example__item__title">Concept Feedback</h4>
          <p className="example__item__content">Will this work? Are you investing in something beneficial? Testing your concept through surveys can gather you insights about whether a product/service would work and invest in only the ones that actually do.</p>
        </section>
      </li>
    </ul>
    <SurveysTip
      content="Clarify all your criteria before making the survey including the size of your market, target audience, and what type of survey you want to use - This will make sure that your survey is on point and gather the necessary information."
    />
  </section>
);