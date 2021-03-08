import { Collapse } from 'antd';
import React, { useMemo, useState } from 'react';
import { bravoSolveProblems, defaultSelectedCollapse } from '../../data';

const { Panel } = Collapse;

const BravoCollapse = () => {
  const [activeKey, setActiveKey] = useState(defaultSelectedCollapse);

  const panels = useMemo(() => bravoSolveProblems.map((bravoSolveProblem) => (
    <Panel
      header={(
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
          <p
            className="tab-btn--title"
          >
            {bravoSolveProblem.tabName}
          </p>
        </>
      )}
      key={bravoSolveProblem.tabName}
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
    </Panel>
  )), []);

  return (
    <div
      className="vertical-tab__collapse"
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
      <Collapse
        defaultActiveKey={defaultSelectedCollapse}
        expandIconPosition="right"
        activeKey={activeKey}
        onChange={([currentTabKey, nextTabKey]) => {
          if (
            currentTabKey
            && !nextTabKey
          ) {
            setActiveKey(currentTabKey);
          } else {
            setActiveKey(nextTabKey);
          }
        }}
      >
        {panels}
      </Collapse>
    </div>
  );
};

export default BravoCollapse;
