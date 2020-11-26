import React from 'react';
import {
  Link
  } from 'react-router-dom';
import NaviBar from './navbar.jsx';
import { useSelector, use } from 'react-redux'


function Header() {
  const cartAmount = useSelector(state => state.cart);
  return <React.Fragment>
    <header>
      <div className="top-header">
        <ul>
          <li><Link to="/login">Đăng nhập</Link></li>
          <li><Link to="/register">Đăng Ký</Link></li>
          <li><Link to="#">Giỏ Hàng ({ cartAmount.length | 0 })</Link></li>
          <li><Link to="#">Thanh Toán</Link></li>
        </ul>
      </div>
      <div className="logo-container">
        <Link to="/" className="logo">
          <img src={"https://dummyimage.com/600x400/fff/000&text=Logo"} alt="the facking logo"/>
        </Link>
        <form>
          <input type="text" placeholder="Tìm kiếm" className="searchbox"/>
        </form>
      </div>
    </header>
    < NaviBar />
  </React.Fragment>
}

export default Header;