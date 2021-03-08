import { Tabs } from 'antd';
import React from 'react';
import { bravoSolveProblems, defaultSelectedTab } from '../../data';

const { TabPane } = Tabs;

const BravoTabs = () => {
  const tabs = bravoSolveProblems.map((bravoSolveProblem) => (
    <TabPane
      key={bravoSolveProblem.id}
      tab={(
        <>
          <img
            src={bravoSolveProblem.tabIcon}
            alt={bravoSolveProblem.tabName}
            className="tab-img"
          />
          <img
            src={bravoSolveProblem.tabActiveIcon}
            alt={bravoSolveProblem.tabName}
            className="tab-img--active"
          />
          <h3
            className="tab-btn--title"
          >
            {bravoSolveProblem.tabName}
          </h3>
        </>
      )}
      className={`tab-content tab-content--${bravoSolveProblem.contentClass}`}
    >
      <h4
        className="tab-content--title"
      >
        {bravoSolveProblem.contentTitle}
      </h4>
      <p
        className="tab-content--content"
      >
        {bravoSolveProblem.content}
      </p>
      <figure
        className="tab-content--img"
      >
        <img src={bravoSolveProblem.contentImg} alt={bravoSolveProblem.contentTitle} />
      </figure>
    </TabPane>
  ));

  return (
    <div
      className="vertical-tab__tab"
    >
      <p
        className="vertical-tab__tab--achive"
      >
        achieve more
      </p>
      <h2
        className="vertical-tab__tab--title"
      >
        How do we solve your problems?
      </h2>
      <Tabs
        tabPosition="left"
        defaultActiveKey={defaultSelectedTab}
        animated={{
          inkBar: false,
          tabPane: false
        }}
        className="vertical-tab__tab--content"
      >
        {tabs}
      </Tabs>
    </div>
  );
};

export default BravoTabs;
