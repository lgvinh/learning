import React from 'react';

const Introduction = () => (
  <div className="solution-introduction__wrapper">
    <section className="solution-introduction__content">
      <h4 className="solution-introduction__heading-upper">Introduction</h4>
      <h3 className="solution-introduction__heading-lower">We are here to help</h3>
      <p className="solution-introduction__description-upper">
        bravoTALENTS is a recruitment tool that gives you
        a more efficient recruitment process by profiling interests, skills and values.
      </p>
      <img
        src="/images/talents/solution/introduction.png"
        alt="we are here to help"
        className="solution-introduction__image"
      />
      <p className="solution-introduction__description-lower">
        With our&nbsp;
        <b>advanced ATS system, </b>
        <br className="solution-introduction__breakline" />
        you can quickly identify and retain the&nbsp;
        <b>right candidates.</b>
      </p>
    </section>
  </div>
);

export default Introduction;
