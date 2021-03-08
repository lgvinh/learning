import React, { useEffect, useState } from 'react';

const GrowthReskill = () => {
  const [recruitment, setRecruitment] = useState(null);

  useEffect(() => {
    const growthRecruitment = document.getElementById('growth-recruitment__wrapper');
    setRecruitment(growthRecruitment);
  }, []);

  const onScrollToRecruitment = () => recruitment.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="growth--re-skill"
    >
      <article
        className="growth--re-skill--content"
      >
        <h4
          className="growth--re-skill--title"
        >
          Unlimited possibility when growing by analyzing your strengths approach
        </h4>
        <p
          className="growth--re-skill--text"
        >
          We have multiple plans for all your business needs. Check out our pricing below/pricing page for more information.
        </p>
        <button
          type="button"
          className="growth--re-skill--jump"
          aria-label="growth--re-skill--jump"
          onClick={onScrollToRecruitment}
        >
          <i className="growth--re-skill--jump-btn" />
        </button>
      </article>
    </div>
  );
};

export default GrowthReskill;
