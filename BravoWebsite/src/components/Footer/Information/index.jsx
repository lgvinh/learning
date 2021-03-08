import React from 'react';
import { Link } from 'gatsby';

const Information = () => (
  <div className="footer-information__wrapper">
    <div className="footer-information__content-wrapper">
      <section
        className="footer-information__technology-wrapper"
      >
        <h4 className="footer-information__item--title">Our Products</h4>
        <ul className="footer-information__list">
          <li><Link to="/talents" className="footer-information__item--text">bravoTALENTS</Link></li>
          <li><Link to="/surveys" className="footer-information__item--text">bravoSURVEYS</Link></li>
          <li><Link to="/growth" className="footer-information__item--text">bravoGROWTH</Link></li>
          <li><Link to="/" className="footer-information__item--text">bravoINSIGHTS</Link></li>
        </ul>
      </section>
      <section
        className="footer-information__resource-wrapper"
      >
        <h4 className="footer-information__item--title">Resource</h4>
        <ul className="footer-information__list">
          <li><Link to="/terms" className="footer-information__item--text">Terms of service</Link></li>
          <li><Link to="/privacy" className="footer-information__item--text">Privacy policy</Link></li>
        </ul>
      </section>
      <section
        className="footer-information__company-wrapper"
      >
        <h4 className="footer-information__item--title">Company</h4>
        <ul className="footer-information__list">
          <li><Link to="/pricing" className="footer-information__item--text">Pricing</Link></li>
          {/* <li><Link to="/" className="footer-information__item--text">Blog</Link></li> */}
          <li><Link to="/contact-us" className="footer-information__item--text">Contact</Link></li>
        </ul>
      </section>
      <section
        className="footer-information__contact-wrapper"
      >
        <h4 className="footer-information__item--title footer-information__item--title-contact">Contact</h4>
        <ul className="footer-information__list">
          <li className="footer-information__item-contact">
            <img src="/svg/footer/icon-phone.svg" alt="phone" className="footer-information__item--img" />
            <a role="button" href="tel:+842838120101" className="footer-information__item-contact--text">
              +84 28 3812 0101
            </a>
          </li>
          <li className="footer-information__item-contact">
            <img src="/svg/footer/icon-mail.svg" alt="email" className="footer-information__item--img" />
            <a role="button" href="mailto:sales@bravosuite.io" className="footer-information__item-contact--text">
              sales@bravosuite.io
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default Information;
