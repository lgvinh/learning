import React from 'react';
import {
  Link
} from 'react-router-dom'

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <div className="register">
          <h3>Đăng Nhập Tài Khoản</h3>
          <div className="content">
            <form action="/login" method="post" className="login-form">
              <label htmlFor="name">Họ và Tên</label>
              <input type="text" name="name" id=""/>
              <label htmlFor="phone">Số điện thoại</label>
              <input type="text" name="phone" id=""/>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id=""/>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id=""/>
              <input type="submit" value="Đăng Nhập"/>
              <p>Ôi Không!? Bạn <Link to="#">Quên mật khẩu</Link> sao?? Click ngay!!!</p>
            </form>
            <article className="convice">
              <h4>Các lí do không thể chối lại khi là thành viên của Cửa Hàng</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Bạn chưa có tài khoản? Hãy <Link to="#">Đăng Ký</Link> ngay
              </p>
            </article>
          </div>
        </div>
    )
  }
}