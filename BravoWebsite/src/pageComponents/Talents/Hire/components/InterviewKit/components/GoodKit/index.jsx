import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <div
    className="good-interview--container"
  >
    <TalentContent
      type="horizontal"
      background="lightBlue"
      className="good-interview"
    >
      <section
        className="good-interview--content"
      >
        <h4
          className="c-talents--title"
        >
          What is a good interview kit?
        </h4>
        <p
          className="c-talents--content"
        >
          The interview kit is a good way to rate the candidate regarding how
          fit the candidate is to the job, job level, interest, company image, expectation, etc.
        </p>
      </section>
      <figure
        className="good-interview--image"
      >
        <img
          src="/images/talents/hire/goodInterview.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </div>
);
