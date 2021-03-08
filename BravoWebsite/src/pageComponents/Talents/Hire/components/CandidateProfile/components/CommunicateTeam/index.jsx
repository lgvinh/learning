import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="lightBlue"
    >
      <div
        className="communication-team"
      >
        <h4
          className="c-talents--title"
        >
          Communicate as a team
        </h4>
        <p
          className="c-talents--content"
        >
          bravoTALENTS has figured out a process to help your candidate profiling
          process work faster and also more efficient.
          We offer all the communication tools you need to hire as a team.
          This improves the quality and efficiency of the hiring process.
        </p>
        <p
          className="c-talents--content communication-team--content"
        >
          All team’s comments and changes are saved and can be easily accessed by
          anyone in the team, and feedback option is also available.
          You can assign tasks to certain individuals in the team.
          This way the team members can keep track of their own and everyone’s assignments.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/communicateTeam.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
