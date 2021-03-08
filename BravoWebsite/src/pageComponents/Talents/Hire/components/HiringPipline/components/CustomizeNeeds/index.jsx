import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      row="reverse"
      background="white"
      className="customize-hiring"
    >
      <div
        className="customize-hiring--container"
      >
        <h4
          className="c-talents--title"
        >
          Your hiring pipeline can be customized based on your needs
        </h4>
        <p
          className="c-talents--content"
        >
          Maybe your company prefers a screening test before the phone call?
          Recommendations? How about training, probation, or portfolio
          checking? Customize your own hiring pipeline to get the best result
          for your vacant positions, because you know what you need the most.
        </p>
        <p
          className="c-talents--content customize-hiring--content"
        >
          At bravoTALENTS, we offer multiple pipelines that can be tailored
          to your needs. Different positions might require different
          pipelines, especially manager positions and above. Your pipeline
          system can also be customized for a variety of departments since
          some departments might have a different set of requirements and
          criteria for recruitment, depending on your business nature.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/customizeNeeds.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
