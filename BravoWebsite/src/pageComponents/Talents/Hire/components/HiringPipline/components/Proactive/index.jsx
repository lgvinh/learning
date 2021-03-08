import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="vertical"
      background="white"
      className="hiring-pipline--proactive"
    >
      <div
        className="hiring-pipline--proactive--content"
      >
        <h4
          className="c-talents--title"
        >
          Proactive recruitment with bravoTALENTS
        </h4>
        <p
          className="c-talents--content"
        >
          Are you wondering about how to make your hiring process more
          efficient? You can now get a detailed view of your data from your
          screening process. This way, you can adapt and better your hiring
          process in an effective way.
        </p>
      </div>
      <figure
        className="hiring-pipline--proactive__image"
      >
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/applied.png"
            alt="applied"
          />
          <figcaption>
            Applied
          </figcaption>
        </figure>
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/inreview.png"
            alt="inreview"
          />
          <figcaption>
            Inreview
          </figcaption>
        </figure>
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/phone-interview.png"
            alt="phone-interview"
          />
          <figcaption>
            Phone Interview
          </figcaption>
        </figure>
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/onsite-interview.png"
            alt="onsite-interview"
          />
          <figcaption>
            On-site Interview
          </figcaption>
        </figure>
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/offer.png"
            alt="offer"
          />
          <figcaption>
            Offer
          </figcaption>
        </figure>
        <figure
          className="hiring-pipline--proactive__image--item"
        >
          <img
            src="/images/talents/hire/hired.png"
            alt="communication"
          />
          <figcaption>
            Hired
          </figcaption>
        </figure>
      </figure>
    </TalentContent>
  </>
);
