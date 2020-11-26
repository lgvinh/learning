import React from 'react';
import {
  Link
} from "react-router-dom";
import MetaData from "../../../MetaData";

import Loader from "../../Loader/LoadingModal";
import CartItem from "./CartItem";

import common from "../../../Common";

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    const { reset } = this.props;
    reset();
  }

  renderListItem = (cart) => {
    return cart && cart.length > 0 && cart.map( (item, index) => {
      return (
        <CartItem
          key={item.id + item.size}
          index={index + 1}
          {...item}
          noUpdate={false}
          forceUpdateHandle={this.forceUpdateHandle}
        />
      ) 
    })
  }

  formatVNDtoNumber = str => {
    str += "";
    return Number(str.replace(/\D/, ""));
  }

  total = cart => {
    let total = 0;
    cart && cart.length > 0 && cart.forEach( item => {
      let price = this.formatVNDtoNumber(item.price);
      return total += Number( (price - (price * Number(item.discount) / 100)) * item.quantity );
    });
    return total;
  }

  forceUpdateHandle = () => this.forceUpdate();

  render() {
    const { formatVND } = common;
    const { isLoading } = this.state;
    const { cart } = this.props;
    return (
      <div id="cart">
        <MetaData
          title = "W.A Perfume Shop | Cart"
          description="Cart page"
          ogTitle="W.A Perfume Shop | Cart"
          // ogI
        />
        <Loader isLoad = {isLoading} />
        <h1>Cart</h1>
        <div className="cart-container shadow">
          {
            cart && cart.length > 0 ?
              this.renderListItem(cart)
            :
              <p className="empty-cart">Empty Cart</p>
          }
        </div>
          {
            cart && cart.length > 0 ?
            <div className="cart-footer">
              <p>
                Total item: {cart.length}
              </p>
              <p>
                Total: {formatVND(this.total(cart))}
              </p>
              <Link to="/checkout">
                Go to Checkout
              </Link>
            </div>
            :
            <></>
          }
      </div>
    )
  }
}