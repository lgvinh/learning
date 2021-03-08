import React from 'react';
import Copyright from '../../../components/Footer/Copyright';
import GetInTouch from '../../../components/Footer/GetInTouch';
import Information from '../../../components/Footer/Information';

function Footer() {
  return (
    <footer className="footer__wrapper">
      <GetInTouch />
      <Information />
      <Copyright />
    </footer>
  );
}

export default Footer;
