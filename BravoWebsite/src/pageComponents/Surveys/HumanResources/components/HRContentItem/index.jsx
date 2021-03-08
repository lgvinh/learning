import PropTypes from 'prop-types';
import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

const HRContentItem = ({ contentItem }) => (
  <section className="human-resources-item">
    <TalentContent row={contentItem.imageFirst ? 'reverse' : 'normal'} background={contentItem.background}>
      <section>
        <h2 className="human-resources-item__title">{contentItem.title}</h2>
        <pre className="human-resources-item__content">
          {contentItem.content}
          {contentItem.hasQuote && <pre className="human-resources-item__quote">{contentItem.quote}</pre>}
        </pre>
      </section>
      <figure>
        <img src={contentItem.image} alt={contentItem.title} />
      </figure>
    </TalentContent>
  </section>
);

HRContentItem.propTypes = {
  contentItem: PropTypes.instanceOf(Object).isRequired
};

export default HRContentItem;