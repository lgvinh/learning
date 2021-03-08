import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="white"
    >
      <div>
        <h4
          className="c-talents--title"
        >
          Finalize your offers
        </h4>
        <p
          className="c-talents--content"
        >
          There might be changes regarding your offer before an agreement is
          made between you and the candidate. bravoTALENTS offers ways to
          communicate and follow up with candidates, so both sides are
          accommodated for mutual benefits.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/finalizeOffer.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
