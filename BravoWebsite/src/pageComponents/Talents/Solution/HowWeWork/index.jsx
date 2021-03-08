import React from 'react';
import TalentContent from '../../../../components/TalentContent';

const HowWeWork = () => (
  <div className="how-we-work__wrapper">
    <div className="how-we-work__content">
      <h4 className="how-we-work__heading-upper">Introduction</h4>
      <h3 className="how-we-work__heading-lower">
        Attract, assess & hire top talent &nbsp;
        <br className="how-we-work__breakline" />
        with bravoTALENTS’ all-in-one platform
      </h3>
      <TalentContent
        type="horizontal"
        background="lightBlue"
        className="how-we-work__info-wrapper"
      >
        <div className="how-we-work__info">
          <h3 className="how-we-work__info-heading">Create stunning career pages</h3>
          <p className="how-we-work__info-text">
            At bravoTALENTS, we want your job postings to stand out. The
            first way to attract your candidates is to build impressive job
            postings and career pages, and spread awareness of your job positioning
            on social media and popular job websites. This allows
            your job opportunities to be discovered organically
            through popular search engines like Google or Bing.
          </p>
        </div>
        <figure
          className="how-we-work__info-figure"
        >
          <img
            src="/images/talents/solution/how_we_work_mobile_1.png"
            alt="how we work"
            className="how-we-work__info-image-mobile"
          />
          <img
            src="/images/talents/solution/how_we_work_1.png"
            alt="how we work"
            className="how-we-work__info-image"
          />
        </figure>
      </TalentContent>
      <TalentContent
        type="horizontal"
        background="lightBlue"
        className="how-we-work__info-wrapper"
        row="reverse"
      >
        <div className="how-we-work__info">
          <h3 className="how-we-work__info-heading">Skill Matching &#38; In-Depth Candidate Evaluation</h3>
          <p className="how-we-work__info-text">
            Evaluate candidates’ skills and personal experiences to streamline
            your recruitment and improve management, enhancing productivity and
            efficiency. We match your job position with potential
            candidates automatically, saving up to 20% time on hiring.
          </p>
        </div>
        <figure
          className="how-we-work__info-figure"
        >
          <img
            src="/images/talents/solution/how_we_work_mobile_2.png"
            alt="how we work"
            className="how-we-work__info-image-mobile"
          />
          <img
            src="/images/talents/solution/how_we_work_2.png"
            alt="how we work"
            className="how-we-work__info-image"
          />
        </figure>
      </TalentContent>
      <TalentContent
        type="horizontal"
        background="lightBlue"
        className="how-we-work__info-wrapper"
      >
        <div className="how-we-work__info">
          <h3 className="how-we-work__info-heading">Expand your talent pool</h3>
          <p className="how-we-work__info-text">
            Don’t let your potential be limited by a
            narrow talent pool. Engage with your passive candidates
            and keep your talent pool warm. Connect to new talent through
            our candidate search and social sourcing to make sure that you
            don’t miss out on that perfect fit.
          </p>
        </div>
        <figure
          className="how-we-work__info-figure"
        >
          <img
            src="/images/talents/solution/how_we_work_mobile_3.png"
            alt="how we work"
            className="how-we-work__info-image-mobile"
          />
          <img
            src="/images/talents/solution/how_we_work_3.png"
            alt="how we work"
            className="how-we-work__info-image"
          />
        </figure>
      </TalentContent>
    </div>
  </div>
);

export default HowWeWork;
