import PropTypes from 'prop-types';
import React from 'react';

const SurveysTip = ({ content, className, marginBottom }) => (
  <section className={`tip--container ${className}`} style={{ marginBottom }}>
    <div className="tip--wrapper">
      <div className="tip--image-container">
        <img src="/images/surveys/education/tip.png" alt="tip" className="tip--image" />
      </div>
      <div className="tip--description-container">
        <p className="tip--description">
          {content}
        </p>
      </div>
    </div>
  </section>
);

SurveysTip.defaultProps = {
  className: '',
  marginBottom: 0
};

SurveysTip.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  marginBottom: PropTypes.number
};

export default SurveysTip;