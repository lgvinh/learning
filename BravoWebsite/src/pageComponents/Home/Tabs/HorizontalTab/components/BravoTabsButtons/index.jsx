import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { bravoTabs } from '../../data';

const BravoTabsButtons = ({ tabIndex, handleClick }) => {
  const tabButtons = useMemo(() => bravoTabs.map((bravoTab) => (
    <button
      key={bravoTab.id}
      type="button"
      onClick={() => handleClick(bravoTab.id - 1)}
      className={`tab-content--button ${tabIndex === bravoTab.id - 1 ? 'tab-content--button-active' : ''}`}
    >
      <img
        src={bravoTab.tabLogo}
        alt={bravoTab.name}
      />
    </button>
  )), [tabIndex, handleClick]);

  return (
    <div className="carousel-button">
      <div className="carousel-button__wrapper">
        {tabButtons}
      </div>
    </div>
  );
};

BravoTabsButtons.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default BravoTabsButtons;
