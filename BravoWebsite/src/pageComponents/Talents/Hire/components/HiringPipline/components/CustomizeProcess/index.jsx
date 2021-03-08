import React from 'react';
import TalentContent from '../../../../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="lightBlue"
      className="customize-hiring"
    >
      <div>
        <h4
          className="c-talents--title"
        >
          Customize your pipeline to greatly improve your hiring process
        </h4>
        <p
          className="c-talents--content"
        >
          bravoTALENTS is built with a default hiring pipeline
          including all the normal recruiting stages.
          This is what most companies are familiar with.
          However, we understand that your job position might
          need a specific pipeline that works only for you.
          Hence, we give you the option to customize your own
          hiring pipeline to maximize you and your team’s hiring process.
        </p>
      </div>
      <figure>
        <img
          src="/images/talents/hire/customizeProcess.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
