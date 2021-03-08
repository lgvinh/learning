import { Link } from 'gatsby';
import React from 'react';

const ContentButton = () => (
  <div className="header__btn-group">
    <Link to="/pricing" className="header__products-btn">
      See Plans
    </Link>
  </div>
);

export default ContentButton;
