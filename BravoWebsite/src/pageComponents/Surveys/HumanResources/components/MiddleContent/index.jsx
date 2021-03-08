import React from 'react';
import TalentContent from '../../../../../components/TalentContent';
import { middleContent } from '../../data/data';

const MiddleContent = () => (
  <section className="human-resources-item__middle">
    <TalentContent row="normal" background={middleContent.background}>
      <div>
        <h2 className="human-resources-item__title">{middleContent.title}</h2>
        <pre className="human-resources-item__content">
          {middleContent.content}
        </pre>
      </div>
      <figure>
        <img src={middleContent.image} alt={middleContent.title} />
      </figure>
    </TalentContent>
  </section>
);

export default MiddleContent;