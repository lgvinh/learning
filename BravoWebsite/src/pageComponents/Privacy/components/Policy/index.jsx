import React from 'react';
import ContactUs from '../ContactUs';

const Policy = () => (
  <main className="policy__wrapper">
    <section className="policy__content">
      <h1 className="policy__content-heading">Privacy Policy</h1>
      <p className="policy__content-date">Updated Oct, 2020</p>
      <div className="policy__content-break-line" />
      <h4 className="policy__content-title">Collection and use of Personal Information</h4>
      <p className="policy__content-text">
        Your privacy is important to us. It is bravoSUITE&apos;s policy to respect your privacy regarding any information we may collect from you across our website,
        {' '}
        <span className="policy__content-link">http://bravosuite.io</span>
        , and other sites we own and operate.
      </p>
      <p className="policy__content-text">
        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge
        and consent. We also let you know why we’re collecting it and how it will be used.
      </p>
      <p className="policy__content-text">
        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within
        commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
        <br />
        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
      </p>
      <p className="policy__content-text">
        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot
        accept responsibility or liability for their respective privacy policies.
      </p>
      <p className="policy__content-text">
        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
      </p>
      <p className="policy__content-text">
        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle
        user data and personal information, feel free to contact us.
      </p>
      <p className="policy__content-text">
        This policy is effective as of 30 October 2020.
      </p>
      <ContactUs />
    </section>
  </main>
);

export default Policy;