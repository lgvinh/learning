import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="vertical"
      background="white"
      id="hiring-team"
    >
      <div
        className="hiring-team--up"
      >
        <h4
          className="hiring-team--up--title c-talents--title"
        >
          Set up your own hiring team
        </h4>
        <p
          className="hiring-team--up--content c-talents--content"
        >
          Add your own team members and set up roles for everyone.
          Hiring team is created on a job-basis and has no member limit.
          Managers can be assigned for every hiring team to take control of the hiring process.
        </p>
      </div>
      <figure
        className="hiring-team--up--down"
      >
        <img
          src="/images/talents/hire/hiringTeam.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
