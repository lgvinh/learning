import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import common from "../../../Common";
import { removeCartItemAction, increaseQuan, decreaseQuan } from "../../../../actions/cartAction";

class CartItem extends React.Component {

  updateQuantityHandle = (type) => {
    const { id, size, increaseQuan, decreaseQuan, forceUpdateHandle } = this.props;
    switch (type) {
      case "inc": {
        increaseQuan({id, size});
        break;
      }
      case "dec": {
        decreaseQuan({id, size});
        break;
      }
      default:
        break;
    }
    forceUpdateHandle();
  }

  render() {
    const { formatVND } = common;
    const { id, size, name, price, quantity, image, discount, removeCartItemAction, noUpdate } = this.props;
    let sale = price - (price*discount/100);
    return (
      <div className="cart-item">
        <div className="cart-item-left">
          {/* <p className="index">
            x{quantity}
          </p> */}
          <div className="cart-main">
            <div className="cart-img">
              <img src={image} alt=""/>
            </div>
            <div className="cart-main-content">
              <a href={`/detail/${id}`} className="name">{name}</a>
              <p>
                {
                  size
                }
              </p>
              <p className="price">
                {
                  formatVND(sale) + ( "\n(" + discount + "%)")
                }
              </p>
            </div>
          </div>
        </div>
        <div className="cart-item-right">
          {/* <input 
            type="number" 
            name="quantity"
            className="quantity"
            id="cart-quantity"
            defaultValue={quantity}
            min={1}
            max={50}
          /> */}
          <p className="quantity" >
            x
            <strong ref={this.quantity}>
              {quantity}
            </strong>
            {
              !noUpdate ?
              <>
                <span 
                  className="quantity-dec"
                  onClick={() => this.updateQuantityHandle("dec")}  
                >
                  -
                </span>
                <span 
                  className="quantity-inc"
                  onClick={() => this.updateQuantityHandle("inc")}  
                >
                  +
                </span>
              </>
              :
              <></>
            }
          </p>
          <p className="cart-total">
            {
              formatVND(sale * quantity)
            }
          </p>
          {
            !noUpdate?
              <span 
                className="cart-delete-item"
                onClick={() => removeCartItemAction({...this.props})}
              >
                x
              </span>
            :
            <></>
          }
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line
const mapStateToProp = ({}) => {
  return {}
}

const mapActionToProp = (dispatch) => {
  return bindActionCreators({
    removeCartItemAction,
    increaseQuan,
    decreaseQuan
  }, dispatch)
}

export default connect(mapStateToProp, mapActionToProp)(CartItem);