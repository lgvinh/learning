import React from 'react';
import { careerContentList, careerIntro } from '../data/careerPagesContentList';
import Introduction from '../Introduction';
import { useDeviceDetect } from '../../../../../hooks';

const CareerPages = () => {
  const isMobile = useDeviceDetect();
  return (
    <>
      <section>
        <article className="description">
          <h2 className="description__title">
            The right time to recruit is now
          </h2>
          <p className="description__content">
            Worried about finding the right people? bravoTALENTS is here. We understand that finding a qualified candidate
            {!isMobile ? <br /> : null}
            for your position is a priority, and we make sure that your job posting gets all the attention it deserves.
          </p>
        </article>
      </section>
      <div>
        <Introduction introContent={careerIntro} />
      </div>
      <div className="intro__how-it-work-container">
        <h2 className="intro__how-it-work">HOW IT WORK</h2>
        <h2 className="intro__introduction">INTRODUCTION</h2>
        <p className="intro__how-it-work-description">How to create an effective job posting with bravoTALENTS</p>
      </div>
      <div className="product-talent__body">
        <div className="product-talent__description-container">
          {careerContentList.map(
            (career) => <Introduction key={career.index} introContent={career} />
          )}
        </div>
      </div>
    </>
  );
};

export default CareerPages;
