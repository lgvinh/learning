import React from 'react';

const Banner = () => (
  <div className="banner__wrapper">
    <div className="banner__content">
      <img src="/svg/talents/solution/banner_logo.svg" alt="Bravo Talents" className="banner__content__logo" />
      <p className="banner__content__text">
        Connecting talent and companies.
      </p>
      <div className="banner__content--group__button">
        <a
          role="button"
          href="https://profiletalents.bravosuite.io/"
          className="banner__content__button banner__content__button__talents"
        >
          I&apos;M A JOBSEEKERS
        </a>
        <a
          role="button"
          href="https://recruiter.bravosuite.io/"
          className="banner__content__button banner__content__button__talents"
        >
          I&apos;M LOOKING FOR TALENTS
        </a>
      </div>
    </div>
  </div>
);

export default Banner;
