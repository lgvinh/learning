import React, { useMemo } from 'react';
import TalentContent from '../../../../components/TalentContent';
import { data } from '../../data';

export default () => {
  const problems = useMemo(() => data.map((problem, index) => (
    <TalentContent
      type="horizontal"
      row={problem.row}
      background="lightBlue"
      className={problem.className}
      key={problem.title}
    >
      <div
        className={`${problem.className}--content max-w-455 ${!(index % 2) ? ' special--content__text' : ''}`}
      >
        <h4
          className={`c-talents--title ${problem.className}--content__title`}
        >
          {problem.title}
        </h4>
        <p
          className={`c-talents--content ${problem.className}--content__content`}
        >
          {problem.content}
        </p>
      </div>
      <figure
        className={`${problem.className}--image`}
      >
        <img
          src={problem.image}
          alt={problem.title}
        />
      </figure>
    </TalentContent>
  )), []);

  return (
    <div
      className="growth--solve-problems bg-light-blue"
    >
      <section
        className="growth--work"
      >
        <h3
          className="growth--work--title"
        >
          How we work
        </h3>
        <p
          className="growth--work--text"
        >
          How do we solve
          <br />
          your problems?
        </p>
        <p className="growth--work--text-mobile">How we solve the problem</p>
      </section>
      {problems}
    </div>
  );
};
