import {
  Col,
  Form,
  Row
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import HelmetComponent from '../../components/Helmet';
import ContactForm from './components/ContactForm';
import ContactInformation from './components/ContactInformation';
import Footer from './components/Footer';
import Header from './components/Header';

const columnLayout = {
  span: 12,
  xl: 12,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24
};

const ContactUs = ({ plan, quantity, unit }) => {
  const [contactFormInstance] = Form.useForm();

  return (
    <div className="contact-us--page">
      <HelmetComponent title="Contact Us - BravoSUITE" />
      <Header />
      <main
        id="contact-us"
      >
        <Row className="contact-us--content">
          <Col
            {...columnLayout}
            className="contact-us--content__left"
          >
            <ContactInformation />
          </Col>
          <Col
            {...columnLayout}
            className="contact-us--content__right"
          >
            <p
              className="contact-us--content__right--title"
            >
              Get in touch
            </p>
            <ContactForm
              form={contactFormInstance}
              plan={plan}
              quantity={quantity}
              unit={unit}
            />
          </Col>
        </Row>
        <div className="light-blue-bg contact-us--white-bg" />
      </main>
      <Footer />
    </div>
  );
};

ContactUs.defaultProps = {
  quantity: undefined,
  plan: undefined,
  unit: undefined
};

ContactUs.propTypes = {
  plan: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string
};

export default ContactUs;
