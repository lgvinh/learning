import React from 'react';
import { Link } from 'gatsby';

const GetInTouch = () => (
  <div className="get-in-touch__wrapper">
    <div className="get-in-touch__section-wrapper">
      <p className="get-in-touch__lets-talk">Let&apos;s Talk!</p>
      <h2 className="get-in-touch__to-help">We&apos;re here to help!</h2>
      <p className="get-in-touch__text">
        Whether you are starting a business, or
        optimizing your enterprize processes, we
        are here to help. Contact us now and
        let&apos;s work together on your project.
      </p>
      <h4 className="get-in-touch__button">
        <Link to="/contact-us">
          get in touch
        </Link>
      </h4>
    </div>
  </div>
);

export default GetInTouch;
