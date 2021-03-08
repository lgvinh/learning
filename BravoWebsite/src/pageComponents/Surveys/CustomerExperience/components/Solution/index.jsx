import React from 'react';
import SurveysTip from '../../../../../components/SurveysTip';

export default () => (
  <div className="solution__wrapper">
    <section className="solution__content">
      <h3 className="solution__heading">Solutions for your industries</h3>
      <ul className="solution__list">
        <li className="solution__item">
          <section className="solution__item__section">
            <img src="/images/surveys/customer-experience/solution-1.png" alt="Customer Satisfaction Score Survey" className="solution__item__image" />
            <h4 className="solution__item__title">Customer Satisfaction Score Survey</h4>
            <p className="solution__item__content">Want to learn about your customers’ experience with your services? Our Customer Satisfaction Score (CSAT) Survey can help you gather all the opinions you need to better your services!</p>
          </section>
        </li>
        <li className="solution__item">
          <section className="solution__item__section">
            <img src="/images/surveys/customer-experience/solution-2.png" alt="Net Promoter Score Survey" className="solution__item__image" />
            <h4 className="solution__item__title">Net Promoter Score Survey</h4>
            <p className="solution__item__content">Customer Loyalty is key to success. How likely will your customers refer you to others? Test your score now with our Net Promoter Score (NPS) survey.</p>
          </section>
        </li>
        <li className="solution__item">
          <section className="solution__item__section">
            <img src="/images/surveys/customer-experience/solution-3.png" alt="Customer Effort Score Survey" className="solution__item__image" />
            <h4 className="solution__item__title">Customer Effort Score Survey</h4>
            <p className="solution__item__content">Customer Service is to core to happy customers. How well are customers rating your service? Measure your service score with our Customer Effort Score (CES) survey and improve your services to fit your customers’ needs!</p>
          </section>
        </li>
      </ul>
    </section>
    <SurveysTip
      content="Stick to one scaling option. Yes our scaling options are nice and pretty, but changes might be confusing, and we need to make use of our customers' precious attention span for the most accurate answers."
    />
  </div>
);