import { Form, Button, Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { FormInstance } from 'antd/lib/form';
import BaseReCaptcha from '../../../../../../components/BaseReCaptcha';
import { EMAIL_PATTERN, TEXT_WITH_SPACE_AND_SPECIAL_CHAR_PATTERN_MAX_400, TEXT_WITH_SPACE_PATTERN_MAX_16 } from '../../../../../../config/patterns';

/**
 *
 * @param {object} props
 * @param {FormInstance<any>} props.form
 * @param {Function} props.handleSubmitForm
 * @param {boolean} props.submitLoadingStatus
 */
const FormDefault = ({
  form,
  handleSubmitForm,
  submitLoadingStatus,
  plan,
  quantity,
  unit
}) => (
  <Form
    className="contact-us--content__form"
    form={form}
    onFinish={handleSubmitForm}
    target="hidden-frame"
  >
    <Form.Item
      className="contact-us--content__form--item"
      rules={[{
        required: true,
        message: 'Invalid name',
        pattern: TEXT_WITH_SPACE_PATTERN_MAX_16
      }]}
      name="name"
    >
      <Input
        id="contact-us--name"
        type="text"
        placeholder="Your name*"
        name="name"
        aria-label="Name"
      />
    </Form.Item>
    <Form.Item
      className="contact-us--content__form--item"
      rules={[{
        required: true,
        message: 'Invalid email',
        pattern: EMAIL_PATTERN
      }]}
      name="email"
    >
      <Input
        id="contact-us--email"
        placeholder="Your email*"
        name="email"
        aria-label="Email"
      />
    </Form.Item>
    <Form.Item
      className="contact-us--content__form--item"
      name="company"
      rules={[{
        pattern: TEXT_WITH_SPACE_PATTERN_MAX_16,
        required: false,
        message: 'Invalid company\'s name'
      }]}
    >
      <Input
        id="contact-us--company"
        type="text"
        placeholder="Your company"
        name="company"
        aria-label="Company"
      />
    </Form.Item>
    <Form.Item
      className="contact-us--content__form--item"
      name="help"
      rules={[{
        pattern: TEXT_WITH_SPACE_AND_SPECIAL_CHAR_PATTERN_MAX_400,
        required: true,
        message: 'Invalid message'
      }]}
      initialValue={
        plan && quantity && unit
          ? `Product: ${plan} \n${quantity} ${unit}`
          : ''
      }
    >
      <Input.TextArea
        name="help"
        id="contact-us--help"
        placeholder="How can we help you ?*"
        aria-label="Help"
      />
    </Form.Item>
    <Form.Item
      className="contact-us--content__form--item"
      name="g-recaptcha-response"
      rules={[{
        required: true,
        message: 'Captcha is required'
      }]}
    >
      <BaseReCaptcha />
    </Form.Item>
    <Form.Item>
      <Button
        className="contact-us--submit-btn"
        htmlType="submit"
        loading={submitLoadingStatus}
      >
        Send
      </Button>
    </Form.Item>
  </Form>
);

FormDefault.defaultProps = {
  quantity: undefined,
  plan: undefined,
  unit: undefined
};

FormDefault.propTypes = {
  form: PropTypes.shape({}).isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  submitLoadingStatus: PropTypes.bool.isRequired,
  plan: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string
};

export default FormDefault;
