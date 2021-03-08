import React from 'react';
import propTypes from 'prop-types';
import ReCaptcha from 'react-recaptcha';
import { G_CAPTCHA_SITE_KEY } from '../../config/config';

const BaseReCaptcha = ({
  siteKey,
  theme,
  // eslint-disable-next-line react/prop-types
  onChange,
  ...props
}) => (
  <ReCaptcha
    sitekey={siteKey}
    theme={theme}
    verifyCallback={(gCaptchaResponseToken) => {
      onChange(gCaptchaResponseToken);
    }}
    expiredCallback={() => {
      onChange('');
    }}
    {...props}
  />
);

BaseReCaptcha.defaultProps = {
  siteKey: G_CAPTCHA_SITE_KEY,
  theme: 'light'
};

BaseReCaptcha.propTypes = {
  siteKey: propTypes.string,
  theme: propTypes.string
};

export default BaseReCaptcha;
