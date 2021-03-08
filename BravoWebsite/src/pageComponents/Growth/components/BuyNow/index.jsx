import React from 'react';

export default () => (
  <div className="banner__wrapper growth__banner">
    <section className="banner__content">
      <h2>
        <img src="/images/growth/home/logo_white.png" alt="Bravo Growth" className="banner__content__logo" />
      </h2>
      <p className="banner__content__text">
        Growth You Business By Strengths Based Approach
      </p>
      <div className="banner__content--group__button">
        <a
          role="button"
          href="https://profilegrowth.bravosuite.io/"
          className="banner__content__button banner__content__button__growth"
        >
          FOR INDIVIDUAL
        </a>
        <a
          role="button"
          href="https://growth.bravosuite.io/"
          className="banner__content__button banner__content__button__growth"
        >
          FOR COMPANY
        </a>
      </div>
    </section>
  </div>
);
