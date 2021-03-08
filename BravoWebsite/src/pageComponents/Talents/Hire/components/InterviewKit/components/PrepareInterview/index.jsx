import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="lightBlue"
    >
      <div
        className="prepare--right-way"
      >
        <h4
          className="c-talents--title prepare--right-way__title"
        >
          Prepare your interviews the right way
        </h4>
        <p
          className="c-talents--content  prepare--right-way__text"
        >
          bravoTALENTS can help you prepare your interviews. We have a list
          of possible questions and interview kits available for each job to
          ensure that your interviews can be conducted smoothly. Your
          interview preparation is now easier and can be done within a short
          amount of time, without compromising on quality and productivity.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/prepareInterview.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
