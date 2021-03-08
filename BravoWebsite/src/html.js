import React from 'react';
import PropTypes from 'prop-types';

export default function HTML(props) {
  const {
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    body,
    postBodyComponents
  } = props;
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {/* Add noscript tag to contain some content when JavaScript is not available */}
        {/* For more information about customizing html.js in gatsbyjs, please take a look at https://www.gatsbyjs.com/docs/custom-html */}
        <noscript>
          This website requires JavaScript. To contact us, please
          send us an email at:
          &nbsp;
          <a href="mailto:sales@bravosuite.io">sales@bravosuite.io</a>
        </noscript>
        {postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.shape({}).isRequired,
  headComponents: PropTypes.arrayOf(PropTypes.any).isRequired,
  bodyAttributes: PropTypes.shape({}).isRequired,
  preBodyComponents: PropTypes.arrayOf(PropTypes.any).isRequired,
  body: PropTypes.string.isRequired,
  postBodyComponents: PropTypes.arrayOf(PropTypes.any).isRequired
};
