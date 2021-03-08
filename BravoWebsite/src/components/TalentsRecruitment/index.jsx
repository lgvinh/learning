import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const TalentsRecruitment = ({ imgUrl, text, ...props }) => (
  <div className="recruitment__wrapper" {...props}>
    <div className="recruitment__content__wrapper">
      <div className="recruitment__content__upper">
        <img src={imgUrl} alt="bravo talents" className="recruitment__content__upper__image" />
        <p className="recruitment__content__upper__text">{text}</p>
      </div>
      <div className="recruitment__content__lower">
        {/* <button type="button" className="recruitment__button recruitment__button--sign-up">sign up free</button> */}
        <button type="button" className="recruitment__button recruitment__button--buy-now">
          <Link
            to="/pricing"
            className="recruitment__link"
          >
            Buy Now
          </Link>
        </button>
      </div>
    </div>
  </div>
);

TalentsRecruitment.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default TalentsRecruitment;
