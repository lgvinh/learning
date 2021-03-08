import React from 'react';

const Banner = () => (
  <div className="banner__wrapper">
    <div className="banner__content">
      <img src="/images/surveys/home/logo_white.png" alt="Bravo Surveys" className="banner__content__logo" />
      <p className="banner__content__text">
        Survey software that answers your needs.
      </p>
      <a role="button" href="/pricing" className="banner__content__button">Buy Now</a>
    </div>
  </div>
);

export default Banner;
