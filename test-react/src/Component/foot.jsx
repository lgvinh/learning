import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return <footer>
      <div className="main-footer">
        <div className="footer-logo">
          <h4>
            <BrowserRouter>
              <Link to="/" className="logo">
                <img src={"https://dummyimage.com/600x400/2d2d2d/fff&text=Logo"} alt="the facking logo"/>
              </Link>
            </BrowserRouter>
          </h4>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </div>
        <ul className="explore"> Khám Phá
          <li><a href="# ">New Collection</a></li>
          <li><a href="# ">Đồng Phục Công Ty</a></li>
          <li><a href="# ">Cửa Hàng</a></li>
          <li><a href="# ">Chính Sách Bán Hàng</a></li>
          <li><a href="# ">Tuyển Dụng</a></li>
          <li><a href="# ">Blog</a></li>
        </ul>
        <ul className="contact"> Liên Lạc
          <li>Hotline 093 183 0894</li>
          <li>vi.vinh0312@gmail.com</li>
          <li>180 Cao Lỗ Quận 8</li>
        </ul>
        <form className="feedback"> Phản Hồi
          <input type="text" name="email" id="" placeholder="Email"/>
          <textarea placeholder="Điền ý kiến của bạn" name="opinion"></textarea>
          <input type="submit" value="Submit" className="submit-btn"/>
        </form>
      </div>
    </footer>;
  }
}

export default Footer;