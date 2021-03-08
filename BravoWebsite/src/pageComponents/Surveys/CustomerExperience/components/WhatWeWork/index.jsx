import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <section className="what-we-work__wrapper">
    <h4 className="what-we-work__upper-heading">What We Work</h4>
    <h3 className="what-we-work__lower-heading">How to deliver the best services?</h3>
    <div className="what-we-work__content">
      <TalentContent
        type="vertical"
        className="what-we-work__content-item"
        row="reverse"
      >
        <section className="what-we-work__content-item-text what-we-work__content-item-text-communication">
          <h3>Communication</h3>
          <p>Keep your communication going. Show that you care about your customers&apos; expectation and opinions. Show them that they can help you to help them.</p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img src="/images/surveys/customer-experience/communication.png" alt="communication" />
        </figure>
      </TalentContent>
      <TalentContent
        type="vertical"
        className="what-we-work__content-item"
        row="reverse"
      >
        <section className="what-we-work__content-item-text what-we-work__content-item-text-interaction">
          <h3>Interaction</h3>
          <p>Get in touch - get to know each other - improve your service. Customers are more likely to return to a business that they feel an attachment to.</p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img src="/images/surveys/customer-experience/interaction.png" alt="interaction" />
        </figure>
      </TalentContent>
      <TalentContent
        type="vertical"
        className="what-we-work__content-item what-we-work__content-item-engagement"
        row="reverse"
      >
        <section className="what-we-work__content-item-text what-we-work__content-item-text-engagement">
          <h3>Engagement</h3>
          <p>
            Don&apos;t mistake engagement for interaction. Engagement is how much effort you put into showing how much you care about customer satisfaction and engage
            with them thoroughly. We appreciate their trust, just like how they appreciate our service.
          </p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img src="/images/surveys/customer-experience/engagement.png" alt="engagement" />
        </figure>
      </TalentContent>
      <TalentContent
        type="vertical"
        className="what-we-work__content-item what-we-work__content-item-understanding"
        row="reverse"
      >
        <section className="what-we-work__content-item-text what-we-work__content-item-text-understanding">
          <h3>Understanding</h3>
          <p>
            Improve efficiency by finding out missing criteria, customers&apos; needs and demands, or what is working and what isn&apos;t. Understanding your customers
            is the first step to success.
          </p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img src="/images/surveys/customer-experience/understanding.png" alt="understanding" />
        </figure>
      </TalentContent>
    </div>
  </section>
);