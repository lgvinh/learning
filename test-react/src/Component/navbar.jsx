import React from 'react';
import {
  BrowserRouter,
  // eslint-disable-next-line
  Route,
  Link
  } from 'react-router-dom';

class NaviBar extends React.Component {
  render() {
    return <BrowserRouter>
      <nav>
        <ul className="nav-bar">
          <li><Link to="/">NEW COLLECTION</Link></li>
          <li>
            <Link to="/">
              CÔNG SỞ
              <span className="drop-down"></span>
            </Link>
            <ul className="sub-menu">
              <li><Link to="/">Áo sơ mi</Link></li>
              <li><Link to="/">Blazer</Link></li>
              <li><Link to="/">Quần</Link></li>
              <li><Link to="/">Váy</Link></li>
              <li><Link to="/">Giày</Link></li>
            </ul>
          </li>
          <li><Link to="/">ĐỒNG PHỤC</Link></li>
          <li>
            <Link to="/">
              DẠO PHỐ
              <span className="drop-down"></span>
            </Link>
            <ul className="sub-menu">
              <li><Link to="/">Đầm</Link></li>
              <li><Link to="/">Áo thun</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/">
              ÁO DÀI
              <span className="drop-down"></span>
            </Link>
            <ul className="sub-menu">
              <li><Link to="/">Cách tân</Link></li>
              <li><Link to="/">Truyền thống</Link></li>
            </ul>
          </li>
          <li><Link to="/">ON SALE</Link></li>
          <li><Link to="/">BLOG</Link></li>
          <li>
            <Link to="/">
              THÔNG TIN
              <span className="drop-down"></span>
            </Link>
            <ul className="sub-menu">
              <li><Link to="/">Chính sách vận chuyển</Link></li>
              <li><Link to="/">Cửa hàng</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </BrowserRouter>
  }
}

export default NaviBar;