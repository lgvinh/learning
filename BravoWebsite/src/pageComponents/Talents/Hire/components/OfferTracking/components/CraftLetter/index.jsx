import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="lightBlue"
    >
      <div>
        <h4
          className="c-talents--title"
        >
          Craft your offer letter
        </h4>
        <p
          className="c-talents--content"
        >
          Customize your offer letters using our templates or your own, to
          support your corporate branding and professional image.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/craftLetter.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
