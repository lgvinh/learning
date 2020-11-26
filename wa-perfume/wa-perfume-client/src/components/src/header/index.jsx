import React from 'react';
import {
  Link
} from 'react-router-dom';
import { ReactComponent as CartIcon } from "../../../assets/SVG/shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../../assets/SVG/user.svg";
import headerAnimation from "./animation";

import common from "../../Common";

export default class Header extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    headerAnimation();
  }

  renderCart = cart => {
    const { formatVND } = common,
          { removeItem } = this.props;
    return cart && cart.length > 0 ? cart.map( item => {
      let { image, id, name, size, discount, quantity, price } = item;
      return (
        <li key={id + size}>
          <div>
            <img src={image} alt={name} title={name}/>
            <div>
              <p>
                <Link to={`/detail/${item.id}`}>
                  {name}
                </Link>
              </p>
              <p>
                Size:
                {
                  size
                }
              </p>
              <p>{formatVND( (price - (price * Number(discount) / 100)) * quantity)}({discount}%)</p>
            </div>
          </div>
          <div>
            <p>x{quantity}</p>
          </div>
          <span 
            title="Xóa sản phẩm" 
            className="close"
            onClick={ () => removeItem({...item})}
          >x</span>
        </li>
      )  
    }) : <li className="empty">Empty cart :(</li>
  }

  render() {
    const { formatVND } = common;
    let total = 0 ;
    const { cart, isSignin } = this.props;
    if ( cart && cart.length > 0 ) {
      cart.map( item =>  total += (item.price-(item.price*item.discount/100)) * item.quantity);
    }
    return (
        <header>
          <div id="hidden-img">
            <img src={require("../../../assets/img/logo.webp")} alt=""/>
          </div>
          <div className="header-content">
            <div className="header-content-left">
              <h1>
                <Link to="/">
                  <img src={require("../../../assets/img/logo.webp")} alt=""/>
                </Link>
              </h1>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {/* <li>
                  <Link to="/">Shop</Link>
                  <ul className="sub-menu">
                    <p> temporary submenu </p>
                  </ul>
                </li> */}
                <li>
                  <Link to="/allproduct">Product</Link>
                  <ul className="sub-menu">
                    <p> temporary submenu </p>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/">Blog</Link>
                  <ul className="sub-menu">
                    <p> temporary submenu </p>
                  </ul>
                </li> */}
                <li>
                  <Link to="/about-us">About us</Link>
                </li>
                {/* <li>
                  <Link to="/contact">Contact</Link>
                </li> */}
                {/* <li>
                  <Link to="/single">Single</Link>
                </li> */}
              </ul>
            </div>

            <div className="header-content-right">
              <div className="shopping-cart">
                <Link to="/cart" className="icon-header cart">
                  <CartIcon />
                  <span className="item-cart">
                    {this.props.cart && this.props.cart.length}
                  </span>
                </Link>
                <div className="cart-item">
                  <ul>
                    {
                      this.renderCart(cart)
                    }
                  </ul>
                  {
                    cart && cart.length > 0 ?
                      <p className="total">
                        Total: { formatVND(total) }
                      </p>
                    :
                      ""
                  }
                </div>
              </div>
              {
                isSignin && isSignin.result ?
                <>
                  <div className="header-login">
                    <Link to="/profile" className="icon-header">
                      {/* <UserIcon /> */}
                      {
                        isSignin.result.avatar && isSignin.result.avatar !== "" ?
                        <img src={ isSignin.result.avatar } alt=""/>
                        :
                        <UserIcon />
                      }
                    </Link>
                    {/* <p>Hi {isSignin.result.firstName}</p> */}
                    <ul className="sub-header-login">
                      <li>
                        <Link to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/signout">
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
                :
                <Link to="/signin" className="icon-header header-login">
                  <UserIcon />
                </Link>
              }
              <div id="icon-menu-mobile">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </header>
    );
  }
}