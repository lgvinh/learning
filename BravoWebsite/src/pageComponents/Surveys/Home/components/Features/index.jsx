import React, { useMemo } from 'react';
import { featureItems } from './data';

export default () => {
  const features = useMemo(() => featureItems.map((featureItem) => (
    <li
      className="features__list--items"
      key={featureItem.name}
    >
      <img
        src={featureItem.img}
        alt={featureItem.name}
        className="features__list--items__image"
      />
      <p
        className="features__list--items__text"
      >
        {featureItem.name}
      </p>
    </li>
  )), []);

  return (
    <div
      className="features"
    >
      <h4
        className="features--title"
      >
        Enterprise Features
      </h4>
      <ul className="features__list">
        {features}
      </ul>
    </div>
  );
};
