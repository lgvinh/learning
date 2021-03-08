import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <section className="how-we-work__wrapper">
    <h4 className="how-we-work__upper-heading">How We Work</h4>
    <h3 className="how-we-work__lower-heading">
      Real-time feedback from real people.
      <br />
      All around the world.
    </h3>
    <div className="how-we-work__content">
      <TalentContent
        type="horizontal"
        row="reverse"
        className="how-we-work__content-item"
      >
        <section className="how-we-work__content-item-text">
          <h3>New ideas formed</h3>
          <p>
            We are stronger, together. Gather opinions all around you to come up with the best business solutions. Invest your time and money
            wisely, and refine your assets and product ideas.
          </p>
        </section>
        <figure className="how-we-work__info-figure">
          <img
            src="/images/surveys/market-research/how-we-work-1.png"
            alt="how we work"
          />
        </figure>
      </TalentContent>
      <TalentContent
        type="horizontal"
        className="how-we-work__content-item"
      >
        <section className="how-we-work__content-item-text">
          <h3>Beautiful design</h3>
          <p>
            Our gorgeous layout is designed to attract respondents and improve engagement for high response rates, collecting more in-depth data and better
            quality of the information returned.
          </p>
        </section>
        <figure className="how-we-work__info-figure">
          <img
            src="/images/surveys/market-research/how-we-work-2.png"
            alt="how we work"
          />
        </figure>
      </TalentContent>
      <TalentContent
        type="horizontal"
        className="how-we-work__content-item"
        row="reverse"
      >
        <section className="how-we-work__content-item-text">
          <h3>Analyze the market</h3>
          <p>
            Don’t miss out on crucial information - know your markets. Plan your approach based on your customers to yield the best outcomes and increase sales.
          </p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img
            src="/images/surveys/market-research/how-we-work-3.png"
            alt="how we work"
          />
        </figure>
      </TalentContent>
      <TalentContent
        type="horizontal"
        className="how-we-work__content-item"
      >
        <section className="how-we-work__content-item-text">
          <h3>Explore customer values</h3>
          <p>
            Understand your customers to win their trust and loyalty, as well as responding to their needs and demands in a timely manner.
          </p>
        </section>
        <figure className="what-we-work__content-item-image">
          <img
            src="/images/surveys/market-research/how-we-work-4.png"
            alt="how we work"
          />
        </figure>
      </TalentContent>
    </div>
  </section>
);