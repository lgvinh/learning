import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Eye } from "../../../assets/SVG/eye.svg";
// import { ReactComponent as Cart } from "../../../assets/SVG/shopping-cart.svg";

// import common from "../../Common";

export default class Product extends React.Component {

  render() {
    // const { formatVND } = common;
    const { id, name, image, preview, duration } = this.props;
    let body = document.body;
    return (
      <div className="product" data-aos="fade-up" data-aos-duration={duration}>
        <figure className="product-image">
          {/* {
            saleOff && saleOff !== 0 ? 
            <p className="sale-off-box">- {saleOff}%</p>
            :
            <></>
          } */}
          <Link to={`/detail/${id}`}>
            <img src={image} alt=""/>
          </Link>
          <div className="hidden-modal">
            <div 
              className="icon" 
              title="Xem nhanh"
              onClick={() => {
                if (body.offsetWidth >= 1024 )
                  preview({...this.props})}
              }
            >
              <Eye />
            </div>
            {/* <div 
              className="icon cart" 
              title="Thêm vào giỏ"
              onClick={() => addFunc({id, name, price, saleOff, image, description, quantity: 1})}  
            >
              <Cart />
            </div> */}
          </div>
        </figure>
        <div className="product-content">
          <Link className="product-name" to={`/detail/${id}`}>
            { name ? name : "foo" }
          </Link>
          {/* {
            saleOff ?
            <div className="price-container">
              <span className="price have-sale">{ price ? formatVND(price) : 0 }</span>
              <span className="sale-off">{ saleOff ? formatVND(priceSaleOff) : 0 }</span>
            </div>
            :
            <div className="price-container">
              <span className="price">{ price ? formatVND(price) : 0 }</span>
            </div>
          } */}
        </div>
      </div>
    )
  }
}

// The reason why i dont use redux on this component is because it is use for other comonent, that's mean <Product/> is gonna render a lot
// Plz dont use redux on this