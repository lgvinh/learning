import PropTypes from 'prop-types';
import React from 'react';

const PlanItem = ({ planItemText }) => (
  <div className="pricing-item__plan-text-group">
    <img src="/svg/pricing/check.svg" className="pricing-item__check-icon" alt="check icon" />
    <span className="pricing-item__plan-text">{planItemText}</span>
  </div>
);

PlanItem.propTypes = {
  planItemText: PropTypes.string.isRequired
};

export default PlanItem;
