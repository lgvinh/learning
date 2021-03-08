import {
  Col, Row, Carousel
} from 'antd';
import { Link } from 'gatsby';
import React, { useMemo, useRef, useState } from 'react';
import { bravoTabs } from '../../data';
import BravoTabsButtons from '../BravoTabsButtons';

const columnLayout = {
  span: 12,
  xl: 12,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24
};

const BravoTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleChangeTab = (_, to) => {
    setTabIndex(to);
  };

  const handleClick = (index) => {
    carouselRef.current.goTo(index);
  };

  const tabs = useMemo(() => bravoTabs.map((bravoTab) => (
    <div key={bravoTab.id} className={`tab-content--bg tab-content--bg-${bravoTab.bg}`}>
      <Row className="tab-content">
        <Col
          span={24}
          className="tab-content__logo--wrapper"
        >
          <figure
            className="tab-content__logo--image"
          >
            <img
              src={bravoTab.whiteLogo}
              alt={bravoTab.name}
              title={bravoTab.name}
            />
          </figure>
        </Col>
        <Col
          {...columnLayout}
          className="tab-content-left"
        >
          <img
            src={bravoTab.image}
            alt={bravoTab.name}
            title={bravoTab.name}
          />
        </Col>
        <Col
          {...columnLayout}
          className="tab-content-right"
        >
          {bravoTab.title === 'Self-Reflection Tool for Your Business' ? (
            <h2
              className="tab-content-right__title"
            >
              {bravoTab.title}
            </h2>
          ) : (
            <p
              className="tab-content-right__title"
            >
              {bravoTab.title}
            </p>
          )}
          <p
            className="tab-content-right__description"
          >
            {bravoTab.description}
          </p>
          {bravoTab.isShowButton
            ? (
              <Link
                className="transparent-btn f-s-16 tab-content-right__btn"
                to={bravoTab.link}
                hidden={tabIndex !== bravoTab.id - 1 ? true : undefined}
              >
                Learn More
              </Link>
            ) : null}
        </Col>
      </Row>
    </div>
  )), [tabIndex]);

  return (
    <>
      <BravoTabsButtons
        tabIndex={tabIndex}
        handleClick={handleClick}
      />
      <Carousel
        infinite={false}
        ref={carouselRef}
        initialSlide={0}
        dots={{ className: 'carousel-dots' }}
        beforeChange={handleChangeTab}
        draggable
      >
        {tabs}
      </Carousel>
    </>
  );
};

export default BravoTabs;
