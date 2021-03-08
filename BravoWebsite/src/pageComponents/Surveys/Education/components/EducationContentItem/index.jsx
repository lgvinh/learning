import PropTypes from 'prop-types';
import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

const EducationContentItem = ({ contentItem }) => (
  <section className="education-item">
    <TalentContent row={contentItem.imageFirst ? 'reverse' : 'normal'} background={contentItem.background}>
      <div>
        <h2 className="education-item__title">{contentItem.title}</h2>
        <pre className="education-item__content">
          {contentItem.content}
          {contentItem.hasQuote && (
            <p className="education-item__quote">
              “Education is a shared commitment between dedicated teachers, motivated students and enthusiastic parents with high expectations.”
              {' '}
              <nobr>-Bob Beauprez</nobr>
            </p>
          )}
        </pre>
      </div>
      <figure>
        <img src={contentItem.image} alt={contentItem.title} />
      </figure>
    </TalentContent>
  </section>
);

EducationContentItem.propTypes = {
  contentItem: PropTypes.instanceOf(Object).isRequired
};

export default EducationContentItem;