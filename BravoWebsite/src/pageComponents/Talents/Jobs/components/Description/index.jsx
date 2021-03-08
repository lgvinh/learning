import PropTypes from 'prop-types';
import React from 'react';

const Description = ({ descriptionTitle, descriptionContent }) => (
  <section>
    <article className="description">
      <h2 className="description__title">{descriptionTitle}</h2>
      <p className="description__content">{descriptionContent}</p>
    </article>
  </section>
);

Description.propTypes = {
  descriptionTitle: PropTypes.string.isRequired,
  descriptionContent: PropTypes.string.isRequired
};

export default Description;
