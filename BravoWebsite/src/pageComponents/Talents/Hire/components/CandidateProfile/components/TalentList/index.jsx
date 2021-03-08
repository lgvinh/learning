import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="vertical"
      background="white"
    >
      <div
        className="talent-list--content"
      >
        <h4
          className="c-talents--title"
        >
          Browsing through your list of talents
        </h4>
        <p
          className="c-talents--content"
        >
          Our search function reduces time on finding particular candidates.
          You can search for any keyword or custom fields in order to find
          the exact candidate you’re looking for within seconds.
        </p>
      </div>
      <figure
        className="talent-list--images"
      >
        <img
          src="/images/talents/hire/listTalent1.png"
          alt="talent list"
        />
        <img
          src="/images/talents/hire/listTalent2.png"
          alt="talent list"
        />
      </figure>
    </TalentContent>
  </>
);
