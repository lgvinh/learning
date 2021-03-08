import React from 'react';

const ContactInformation = () => (
  <>
    <h2 className="contact-us--content__left--title">
      Contact us
    </h2>
    <ul className="contact-us--info">
      <li className="contact-us--info__item">
        <figure
          className="contact-us--info__item--image"
        >
          <img src="/svg/contactUs/location.svg" alt="location" />
        </figure>
        <section
          className="contact-us--info__item--content-wrapper"
        >
          <h4 className="contact-us--info__item--title">
            Head office - Ho Chi Minh City
          </h4>
          <p className="contact-us--info__item--content">
            5th floor, Suite 5.8, e.town 1 building, 364 Cong Hoa Str,
            Ward 13, Tan Binh Dist, Ho Chi Minh City, Vietnam
          </p>
        </section>
      </li>
      <li className="contact-us--info__item">
        <figure
          className="contact-us--info__item--image"
        >
          <img src="/svg/contactUs/phone.svg" alt="location" />
        </figure>
        <a
          href="tel:+84 28 3812 0101"
          className="contact-us--info__item--content"
        >
          +84 28 3812 0101
        </a>
      </li>
      <li className="contact-us--info__item">
        <figure
          className="contact-us--info__item--image"
        >
          <img src="/svg/contactUs/mail.svg" alt="location" />
        </figure>
        <a
          href="mailto:sales@bravosuite.io"
          className="contact-us--info__item--content contact-us--info__item--content-underline"
        >
          sales@bravosuite.io
        </a>
      </li>
    </ul>
  </>
);

export default ContactInformation;
