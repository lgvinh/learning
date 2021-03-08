import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FormDefault from './components/FormDefault';
import { post } from '../../../../utils/apiFactory';
import { API_RESPONSE_STATUS } from '../../../../config/constant';
import FormSuccess from './components/FormSuccess';
import FormFail from './components/FormFail';
import { BRAVO_API_URL } from '../../../../config/config';

const ContactForm = ({
  form, plan, quantity, unit
}) => {
  const [submitLoadingStatus, setSubmitLoadingStatus] = useState(false);
  const [submitFormStatus, setSubmitFormStatus] = useState(API_RESPONSE_STATUS.DEFAULT);

  const handleSubmitForm = async (values) => {
    setSubmitLoadingStatus(true);
    let result;
    try {
      result = await post(BRAVO_API_URL, values);
    } catch (error) {
      // eslint-disable-next-line no-empty
    } finally {
      setSubmitLoadingStatus(false);
    }

    if (
      result?.statusCode === 200
    ) {
      return setSubmitFormStatus(API_RESPONSE_STATUS.SUCCESS);
    }
    return setSubmitFormStatus(API_RESPONSE_STATUS.FAIL);
  };

  const displayForm = () => {
    switch (submitFormStatus) {
    case API_RESPONSE_STATUS.DEFAULT:
      return (
        <FormDefault
          form={form}
          plan={plan}
          unit={unit}
          quantity={quantity}
          handleSubmitForm={handleSubmitForm}
          submitLoadingStatus={submitLoadingStatus}
        />
      );
    case API_RESPONSE_STATUS.SUCCESS:
      return (
        <FormSuccess />
      );
    case API_RESPONSE_STATUS.FAIL:
      return (
        <FormFail />
      );
    default:
      return <></>;
    }
  };

  return displayForm();
};

ContactForm.defaultProps = {
  quantity: undefined,
  plan: undefined,
  unit: undefined
};

ContactForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  plan: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string
};

export default ContactForm;
