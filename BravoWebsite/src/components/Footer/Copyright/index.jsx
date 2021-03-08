import { Col } from 'antd';
import React from 'react';
import { Link } from 'gatsby';

function Footer() {
  return (
    <div className="copyright-bar__section-wrapper">
      <div className="copyright-bar__wrapper">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 20 }}
          lg={{ span: 20 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
          className="copyright-bar__content"
        >
          <div className="copyright-bar__content--left">
            <Link to="/">
              <img src="/svg/footer/footer_logo.svg" alt="bravo suite" className="copyright-bar__content--left--logo" />
            </Link>
            <p className="copyright-bar__content--left--text">Copyright &#169; 2020 bravoSUITE. All rights reserved.</p>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 2 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          xxl={{ span: 2 }}
        >
          <ul className="copyright-bar__social">
            <li className="copyright-bar__social--item">
              <a role="button" href="/">
                <img src="/svg/footer/footer_fb.svg" alt="Facebook" />
              </a>
            </li>
            {/* <li className="copyright-bar__social--item">
              <a href="/">
                <img src="/svg/footer/footer_blog.svg" alt="Blog" />
              </a>
            </li> */}
          </ul>
        </Col>
      </div>
    </div>
  );
}

export default Footer;
