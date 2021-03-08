import React from 'react';
import TalentContent from '../../../../components/TalentContent';

export default () => (
  <>
    <TalentContent
      type="horizontal"
      background="white"
      className="bravoGrowth"
    >
      <div
        className="bravoGrowth--content special--content__text"
      >
        <p
          className="bravoGrowth--introduction"
        >
          Introduction
        </p>
        <h4
          className="c-talents--title bravoGrowth--title"
        >
          What is bravoGrowth
        </h4>
        <h4
          className="c-talents--title bravoGrowth--title-mobile"
        >
          What is bravoGROWTH
        </h4>
        <div className="content-desktop">
          <p
            className="c-talents--content"
          >
            bravoGROWTH is a personal reflection tool for your employees to figure out
            who they really are and what drives them in life. It is based on RIASEC and
            MBTI tests – by analyzing the results, your company can make the right
            choice in training and developing your employees.
          </p>
          <p
            className="c-talents--content bravoGrowth--text"
          >
            Growing a business can be challenging when you don’t really know their
            strengths, but only weaknesses. By using bravoGROWTH, your business can now
            put your employees in the right positions and improve your organization’s
            strengths.
          </p>
        </div>
        <div className="content-mobile">
          <p className="c-talents--content bravoGrowth--text-mobile">
            bravoTALENTS is a recruitment tool that gives you a more efficient recruitment process by profiling interests, skills and values.
          </p>
        </div>
      </div>
      <figure
        className="bravoGrowth--image special--content__image"
      >
        <img
          src="/images/growth/home/bravoGrowth.png"
          alt="communication"
        />
      </figure>
    </TalentContent>
  </>
);
