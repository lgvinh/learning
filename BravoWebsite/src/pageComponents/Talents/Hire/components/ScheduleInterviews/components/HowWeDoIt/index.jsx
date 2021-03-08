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
          How we do it
        </h4>
        <p
          className="c-talents--content"
        >
          bravoTALENTS is here to help you minimize time spent on setting up
          interviews and maximize your process efficiency. Your interview
          schedules will be shown in an organized manner so you will be able
          to check everyone’s availability within clicks. Changes? Just
          drag-and-drop your appointment to the new time/date! This reduces
          time to reschedule and makes it a lot easier to keep track of your interview process.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/howWeDoIt.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
