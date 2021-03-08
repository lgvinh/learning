import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <TalentContent
    type="vertical"
    background="white"
    className="include-kit"
  >
    <div
      className="include-kit--content"
    >
      <h4
        className="c-talents--title"
      >
        What should your interview kit include?
      </h4>
      <p
        className="c-talents--content"
      >
        A good interview kit should cover not only the candidate’s strengths
        and weaknesses, but can showcase the company’s culture, history, and expectation as well.
      </p>
    </div>
    <figure>
      <img
        src="/images/talents/hire/includeKit.png"
        alt="communication"
      />
    </figure>
  </TalentContent>
);
