import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      row="reverse"
      background="white"
      className="communication--candidate"
    >
      <div>
        <h4
          className="c-talents--title"
        >
          Communicate to your candidates
        </h4>
        <p
          className="c-talents--content"
        >
          Obviously, the communication between interviewers and candidates
          is one of the most vital parts of the hiring process.
          bravoTALENTS makes sure that all communication
          is carried smoothly through our smart 2-way email sync.
          We connect your email to your bravoTALENTS email,
          and all communication is tracked and available through
          both your working email and our system.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/communicateCandidate.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
