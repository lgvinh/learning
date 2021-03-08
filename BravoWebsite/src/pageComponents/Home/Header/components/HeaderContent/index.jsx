import React from 'react';
import ContentButton from '../ContentButton';

const HeaderContent = () => (
  <div
    className="header--content--wrapper"
  >
    <div
      className="header--main--content"
    >
      <section className="header__content">
        <h1 className="header__content-title">The Tool That Brings You The Ultimate Business Experience</h1>
        <p className="header__description">
          The Ultimate Tool to Optimize Your Business Experience
        </p>
        <ContentButton />
      </section>
    </div>
  </div>
);

export default HeaderContent;
