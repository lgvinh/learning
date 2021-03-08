import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      row="reverse"
      background="white"
    >
      <div>
        <h4
          className="c-talents--title"
        >
          Keep track of your scorecards (Coming Soon)
        </h4>
        <p
          className="c-talents--content"
        >
          Use scorecards to review the candidates to find out the best fit
          for your position. These help recruiters keep track of their hiring
          status and influence hiring decisions using quantitative data. We
          have a list of scorecards available, but you can also create your
          own scorecards for any recruitment stage to fit your needs best.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/trackScrorecard.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
