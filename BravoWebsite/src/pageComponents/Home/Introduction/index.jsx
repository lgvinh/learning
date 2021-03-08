import React, { useMemo } from 'react';

const introductionList = [
  {
    id: 1,
    Icon: <img
      src="/svg/introduction/icon-recruitment.svg"
      alt="Recruitment Process"
      title="Recruitment"
    />,
    title: 'Enhance Your Recruitment Process',
    description: 'Restructure your recruitment pipeline to engage with your talents better'
  },
  {
    id: 2,
    Icon: <img
      src="/svg/introduction/icon-insights.svg"
      alt="Useful Insights"
      title="Insights"
    />,
    title: 'Gathering Useful Insights',
    description: 'Gathering Useful Insights creating and evaluating surveys within a few clicks'
  },
  {
    id: 3,
    Icon: <img
      src="/svg/introduction/icon-potential.svg"
      alt="Exploring Potential"
      title="Potential"
    />,
    title: 'Exploring Your Potential',
    description: 'Exploring Your Potential figuring out your unique selling points and approaches for growth'
  }
];

const Introduction = () => {
  const introductionItems = useMemo(() => introductionList.map((introductionItem) => (
    <li
      className="introduction--item"
      key={introductionItem.id}
    >
      <figure className="introduction--item__image">
        {introductionItem.Icon}
      </figure>
      <section className="introduction--item__wrapper">
        <h3
          className="introduction--item__wrapper--title"
        >
          {introductionItem.title}
        </h3>
        <p
          className="introduction--item__wrapper--description"
        >
          {introductionItem.description}
        </p>
      </section>
    </li>
  )), []);

  return (
    <div className="introduction__wrapper">
      <div className="introduction__body">
        <div className="introduction__image" />
        <div className="introduction">
          <article className="introduction__container">
            <h2
              className="introduction__container--title"
            >
              INTRODUCTION
            </h2>
            <section className="introduction__content">
              <h2
                className="introduction__content--title"
              >
                What is bravoSUITE?
              </h2>
              <p
                className="introduction__content--description"
              >
                The platform that helps you transform your business from recruiting,
                reskill, upskill to making the right decisions with useful insights.
              </p>
            </section>
          </article>
          <ul className="introduction__list">
            {introductionItems}
          </ul>
        </div>
      </div>
      <footer className="introduction__footer">
        <div className="introduction__footer--image">
          <img
            src="/svg/introduction/suite.svg"
            alt="BravoSUITE"
            title="BravoSUITE"
          />
        </div>
        <h2>Enhance Your Business Processes</h2>
      </footer>
    </div>
  );
};

export default Introduction;
