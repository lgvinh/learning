import React from 'react';
import TalentContent from '../../../../../components/TalentContent';

export default () => (
  <div className="engage__how-we-work">
    <TalentContent
      background="lightBlue"
      className="engage__how-we-work__item-1"
    >
      <section className="engage__info">
        <h3 className="engage__info-heading">
          Recruitment through responsive interaction and active communication
        </h3>
        <p className="engage__info-content">
          bravoTALENTS believes that the most important thing in the hiring process is engagement, and
          we make sure that is always our priority.  bravoTALENTS ENGAGE helps you make the best first impression
          to your candidates and keep them engaged and connected to you at all time, through tools that
          support constant communication and interaction.
        </p>
      </section>
      <figure>
        <img
          src="/images/talents/engage/how_we_work_1.png"
          alt="Recruitment through responsive interaction and active communication"
        />
      </figure>
    </TalentContent>
    <TalentContent
      row="reverse"
      className="engage__how-we-work__item-2"
    >
      <section className="engage__info">
        <h3 className="engage__info-heading">
          How bravoTALENTS ENGAGE can help your recruiting process
        </h3>
        <p className="engage__info-content">
          We make sure that all candidates feel welcomed and wanted with our scheduled check-in system. This way, even
          the most passive candidates will be kept up-to-date on all communication and encourage interaction.
          <br />
          <br />
          We avoid making the users do repetitive manual tasks which can be performed automatically by the system, to
          drive the over-all productivity. All feedback is delivered in a timely manner to improve candidate experience
          and push things on a steady pace. You will not miss out any task as reminders can be set to reduce hiring time
          and make sure everything is on time.
        </p>
      </section>
      <figure>
        <img
          src="/images/talents/engage/how_we_work_2.png"
          alt="How bravoTALENTS ENGAGE can help your recruiting process"
        />
      </figure>
    </TalentContent>
  </div>
);