import PropTypes from 'prop-types';
import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

const Introduction = ({ introContent }) => (
  <section className={`intro ${introContent.className}`}>
    <TalentContent row={introContent.imageFirst ? 'reverse' : 'normal'} background={introContent.background}>
      <div>
        <h2 className="intro__index">{introContent.index}</h2>
        <h2 className="intro__title">{introContent.title}</h2>
        <pre className="intro__content">{introContent.content}</pre>
      </div>
      <figure>
        <img src={introContent.image} alt={introContent.title} />
      </figure>
    </TalentContent>
  </section>
);

Introduction.propTypes = {
  introContent: PropTypes.instanceOf(Object).isRequired
};

export default Introduction;
