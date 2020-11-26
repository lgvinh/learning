import React from 'react';
import {
  Link
} from "react-router-dom";
import moment from "moment";
import MetaData from "../../../MetaData";
import api from "../../../../api/callApi";

import Loader from "../../Loader/LoadingModal";
import CartItem from "../Cart/CartItem";

import common from "../../../Common";

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      address: "",
      message: [],
      phone: "",
      name: ""
    };
    this.address = React.createRef();
  }

  componentDidMount() {
    const { inputAnimation } = common;
    inputAnimation();
    setTimeout(() => {
      // const { isSignin, cart, history, reset } = this.props;
      const { reset } = this.props;
      // if ( 
      //   isSignin.status === 200 &&
      //   cart &&
      //   cart.length > 0
      // ) {
        reset();
      // } else {
      //   history.push("/signin");
      // }
      this.setState({isLoading: false});
    }, 1000);
  }

  getTotalItem = cart => {
    const { formatVND } = common;
    let total = 0,
        quantity = 0;
    cart && cart.forEach( item => {
      total += ( Number(item.price) - Number(item.price)*item.discount/100 ) * item.quantity;
      quantity += Number(item.quantity)
    });
    return {
      total: formatVND(total),
      quantity
    };
  }

  purchaseHandle = async () => {
    const { cart, clearCart, history } = this.props,
          { address, phone, name } = this.state;
    if ( 
      address.length === 0 ||
      name.length === 0 ||
      phone.length === 0
    )
      this.setState({message:["error", "Address, phone or name can not be empty"]});
    else {
      this.setState({isLoading: true});
      try {
        let data = await api.post("api/order/add", {cart, address, name, phone});
        if ( data.status !== 200) {
          this.setState({message:["error", "Error while processing, please try again"]});
          setTimeout(() => {
            console.log(data);
            clearCart();
            history.push("/");
            this.setState({isLoading: false});
          }, 1000);
        } else {
          this.setState({message:["success", "Your order have been sent"]});
          setTimeout(() => {
            clearCart();
            history.push("/");
            this.setState({isLoading: false});
          }, 1000);
        } 
      } catch (error) {
        this.setState({message:["error", "Error while processing, please try again"]});
        setTimeout(() => {
          clearCart();
          history.push("/");
          this.setState({isLoading: false});
        }, 1000);
        console.log(error);
      }
    }
  }
  
  renderListItem = (cart) => {
    return cart && cart.length > 0 && cart.map( (item, index) => {
      return (
        <CartItem
          key={item.id + item.size}
          index={index + 1}
          {...item}
          noUpdate={true}
        />
      ) 
    })
  }

  render() {
    const { isSignin, cart } = this.props;
    const { isLoading, message } = this.state;
    const { total, quantity } = this.getTotalItem(cart);
    return (
      <div id="checkout">
        <Loader
          isLoad={isLoading}
        />
        <MetaData
          title = "W.A Perfume Shop | Checkout"
          description="Checkout page"
          ogTitle="W.A Perfume Shop | Checkout"
          // ogI
        />
        {/*For Page*/}
        <div className="bg">
          {/*For Row containing all card*/}
          <div className="row mainRow">
            {/*Card 1*/}
            <div className="col-lg-8">
              <div className="card card-cascade wider shadow p-3 mb-5 ">
                {/*Product Description*/}
                <div className="desc">
                  {/* 1st Row for title*/}
                  <div className="row">
                    {/*Column for Data*/}
                    {/* <div className="col">
                      <p className="text-muted row1">Milage</p>
                      <p className="row2">100 KM</p>
                    </div> */}
                    {this.renderListItem(cart)}
                  </div>
                </div>
              </div>
            </div>
            {/*Card 2*/}
            <div className="col-lg-4">
              <div className="card card-cascade card-ecommerce wider shadow p-3 mb-5 ">
                {/*Card Body*/}
                <div className="card-body card-body-cascade">
                  {/*Card Description*/}
                  <div className="card2decs">
                    {/* eslint-disable-next-line */}
                    <p className="heading1 text-center"><strong>{isSignin.result && isSignin.result.firstName || ""}</strong></p>
                    <p className="quantity">Qty <span className="float-right text1">{quantity}</span></p>
                    <p className="shipping">Shipping<span className="float-right text1">Free</span></p>
                    {/* <p className="promocode">Promo Code<span className="float-right text1">-$100</span></p> */}
                    <p className="total-text"><strong>Total</strong><span className="totalText2">{total}</span></p>
                  </div>
                  <div className="payment">
                    <p className="heading2"><strong>Payment Details</strong></p>
                    <p className="cardAndExpire">Delivery method<strong className="float-right">COD</strong></p>
                    {
                      isSignin.result && isSignin.result.firstName ?
                      <p className="cardAndExpire">Full name<span className="float-right">{isSignin.result ? `${isSignin.result.firstName} ${isSignin.result.lastName}` : ""}</span></p>
                      :
                      <></>
                    }
                    <p className="cardAndExpire">Date<span className="float-right">{moment().format("DD/MM/YYYY")}</span></p>
                    <p className="cardAndExpire">Phone<span className="float-right">{isSignin.result && isSignin.result.phone}</span></p>
                    <p className="cardAndExpire">Receiver's name<span className="float-right max-w-50">
                      <span className="c-input-eff">
                        <input 
                          type="text"
                          name="receiver-name"
                          id="receiver-name"
                          placeholder="john doe"
                          required={true}
                          className="text-right"
                          onInput={e => this.setState({name: e.currentTarget.value})}
                        />
                        <label htmlFor="address">Ship to Address</label>
                      </span>
                      </span></p>
                    <p className="cardAndExpire">Receiver's phone<span className="float-right max-w-50">
                      <span className="c-input-eff">
                        <input 
                          type="text"
                          name="receiver-phone"
                          id="receiver-phone"
                          placeholder="0123"
                          required={true}
                          className="text-right"
                          onInput={e => this.setState({phone: e.currentTarget.value})}
                        />
                        <label htmlFor="address">Ship to Address</label>
                      </span>
                      </span></p>
                    <p className="cardAndExpire">Receiver's address<span className="float-right max-w-50">
                      <span className="c-input-eff">
                        <input 
                          type="text"
                          name="address"
                          id="address"
                          placeholder="abcxyz"
                          required={true}
                          className="text-right"
                          onInput={e => this.setState({address: e.currentTarget.value})}
                        />
                        <label htmlFor="address">Ship to Address</label>
                      </span>
                      </span></p>
                    <p className="cardAndExpireValue">Total(including ship)<span className="float-right">{total}</span></p>
                    {
                      message && message.length > 0 ?
                        <p className={`cardAndExpireValue ${message[0]}`} style={{maxWidth: 250}}>
                          {message[1]}
                        </p>
                      :
                        <></>
                    }
                  </div>
                  {/*Card footer*/} 
                  <Link to="#" className="purchaseLink">
                    <div 
                      className="card-footer text-center"
                      onClick={() => this.purchaseHandle()}
                    > 
                      PURCHASE → 
                    </div>
                  </Link>
                  <Link to="/cart" className="backLink">
                    <div 
                      className="card-footer text-center"
                    > 
                      Back 
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}