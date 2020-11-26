import React from 'react';
import { Link } from "react-router-dom";


export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-content">
          <ul>
            <li>
              <h4>
                <Link to="/">
                  <img src={require("../../../assets/img/logo.webp")} alt=""/>
                </Link>
              </h4>
            </li>
            <li>
              180 Cao Lỗ Quận 8 TP. Hồ Chí Minh
            </li>
            <li>
              (+84) 327976134
            </li>
            <li>
              something@somemail.com
            </li>
          </ul>
          <ul className="footer-content-list">
            <li>
              Help
            </li>
            <li>
              <Link to="/">
                Search
              </Link>
            </li>
            <li>
              <Link to="/">
                Help
              </Link>
            </li>
            <li>
              <Link to="/">
                Information
              </Link>
            </li>
            <li>
              <Link to="/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/">
                Shipping Detail
              </Link>
            </li>
          </ul>
          <ul className="footer-content-list">
            <li>
              Support
            </li>
            <li>
              <Link to="/">
                Search
              </Link>
            </li>
            <li>
              <Link to="/">
                Help
              </Link>
            </li>
            <li>
              <Link to="/">
                Information
              </Link>
            </li>
            <li>
              <Link to="/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/">
                Shipping Detail
              </Link>
            </li>
          </ul>
          <ul className="footer-content-list">
            <li>
              Information
            </li>
            <li>
              <Link to="/">
                Search
              </Link>
            </li>
            <li>
              <Link to="/">
                Help
              </Link>
            </li>
            <li>
              <Link to="/">
                Information
              </Link>
            </li>
            <li>
              <Link to="/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/">
                Shipping Detail
              </Link>
            </li>
          </ul>
        </div>
        <div className="copy-right">
          <p>
            Copyright © 2020, W.A | Built by Ja Vince
          </p>
        </div>
      </footer>
    );
  }
}