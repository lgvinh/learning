import { Tabs } from 'antd';
import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'gatsby';
import { solutions } from './data';
import { useDeviceDetect } from '../../../../../hooks';
import { BUTTON_CHANGE_TAB_TYPE } from '../../../../../config/constant';

const { TabPane } = Tabs;

export default () => {
  const [activeTab, setActiveTab] = useState(solutions[0].title);

  const isMobile = useDeviceDetect();

  const industrySolutions = useMemo(() => solutions.map((solution) => (
    <TabPane
      key={solution.title}
      className="survey-home__tabs--tab-pane"
    >
      <figure
        className="survey-home__tabs--images"
      >
        <img
          src={solution.img}
          alt={solution.title}
        />
      </figure>
      <section
        className="survey-home__tabs--content"
      >
        <h5
          className="survey-home__tabs--content__title"
        >
          {solution.title}
        </h5>
        <p
          className="survey-home__tabs--content__text"
        >
          {solution.content}
        </p>
        <Link
          to={solution.url}
          className="survey-home__tabs--content__btn transparent-btn"
        >
          Learn more
        </Link>
      </section>
    </TabPane>
  )), []);

  const onChangeTab = useCallback((tab, type) => {
    const currentTabIndex = solutions.indexOf(solutions.find((solution) => solution.title === tab));

    if (type === BUTTON_CHANGE_TAB_TYPE.NEXT) {
      if (currentTabIndex < 3) {
        setActiveTab(solutions[currentTabIndex + 1].title);
      } else {
        setActiveTab(solutions[0].title);
      }
    }

    if (type === BUTTON_CHANGE_TAB_TYPE.PREVIOUS) {
      if (currentTabIndex > 0) {
        setActiveTab(solutions[currentTabIndex - 1].title);
      } else {
        setActiveTab(solutions[3].title);
      }
    }
  }, []);

  const carouselButtons = useMemo(() => solutions.map((solution) => (
    <div
      className={`carousel--btn${solution.title === activeTab ? ' active' : ''}`}
      key={solution.title}
      onClick={() => {
        setActiveTab(solution.title);
      }}
    />
  )), [activeTab]);

  return (
    <div
      className="survey-home__tabs"
    >
      <h4
        className="survey-home__tabs--title"
      >
        Solutions for your industries
      </h4>
      <Tabs
        activeKey={activeTab}
      >
        {industrySolutions}
      </Tabs>
      <div className="carousel--btn--container">
        {carouselButtons}
      </div>
      {!isMobile ? (
        <button
          className="survey-home__tabs--btn survey-home__tabs--prev"
          type="button"
          aria-label="prev-btn"
          onClick={() => onChangeTab(activeTab, BUTTON_CHANGE_TAB_TYPE.PREVIOUS)}
        >
          <i />
        </button>
      ) : null}
      {!isMobile ? (
        <button
          className="survey-home__tabs--btn survey-home__tabs--next"
          type="button"
          aria-label="next-btn"
          onClick={() => onChangeTab(activeTab, BUTTON_CHANGE_TAB_TYPE.NEXT)}
        >
          <i />
        </button>
      ) : null}
    </div>
  );
};
