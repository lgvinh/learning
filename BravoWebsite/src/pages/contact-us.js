import React from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/index.scss';
import ContactUs from '../pageComponents/ContactUs';

const ContactUsPage = ({ location }) => <ContactUs {...location.state} />;

ContactUsPage.defaultProps = {
  location: {
    state: {}
  }
};

ContactUsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({})
  })
};

export default ContactUsPage;
