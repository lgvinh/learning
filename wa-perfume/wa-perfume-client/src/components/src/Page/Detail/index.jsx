import React from 'react';
import { Link } from "react-router-dom";
import api from "../../../../api/callApi";
import common from "../../../Common";

import Loader from "../../Loader/LoadingModal";

export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      id: "",
      discountId: "",
      discount: 0,
      size: "",
      price: 0,
      quantity: 1,
      addSuccess: false
    }
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { id } = this.props;
  //   const { price, size, quantity } = this.state;
  //   if ( 
  //     id === nextProps.id &&
  //     price === nextState.price &&
  //     size === nextState.size &&
  //     quantity === nextState.quantity
  //   )
  //     return false;
  //   return true;
  // }

  componentDidUpdate(prevProps) {
    const { id, sizes } = this.props;
    if (sizes) {
      if ( id !== prevProps.id )
        this.setState({price: sizes[0].price, size: sizes[0].size, discount: sizes[0].discount, discountId: sizes[0].discountId});
    }
  }

  handleSizeChoose = e => {
    const { currentTarget: target } = e;
    this.setState({price: target.dataset.price, size: target.innerHTML.split("<")[0], discount: target.dataset.discount, quantity: 1, discountId: target.dataset.discountid});
    document.getElementsByClassName("size").forEach( item => {
      item.className = item.className.replace(" active", "");
    });
    target.className += " active";
  }

  quantityInput = (type, value = 1) => {
    value = isNaN(value) ? 1 : value < 1 ? 1 :  value >= 50 ? 50 : Number(value);
    let quantityInput = document.getElementById("quantity"),
        valueInput = Number(quantityInput.value);
    switch (type) {
      case "increase":
        valueInput += 1;
        quantityInput.value = valueInput >= 50 ? 50 : valueInput;
        this.setState({quantity: quantityInput.value});
        break;
      case "decrease":
        quantityInput.value = valueInput <= 1 ? valueInput : valueInput - 1;
        this.setState({quantity: quantityInput.value});
        break;
      case "input":
        quantityInput.value = value;
        this.setState({quantity: quantityInput.value});
        break;
      default:
        break;
    }
  }


  async componentDidMount() {
    const { reset } = this.props;
    reset();
    const id = window.location.pathname.replace("/detail/", "");
    let data = await api.get(`api/filter/perfume?id=${id}`);
    this.setState({isLoading: false, data: data.result[0]});
    console.log(this.state.data);
  }
  
  countQuantity = producers => {
    let quantity = 0;
    producers.forEach( item => {
      quantity += item.quantity;
    });
    return quantity;
  }
  
  countQuantityOnSizes = size => {
    let quantity = 0;
    size.forEach(item => {
      quantity += this.countQuantity(item.producers);
    });
    return quantity;
  }

  renderSizes = sizes => {
    return (
      sizes && sizes.length > 0 ?
        sizes.map( (item, index) => {
          return (
            <p
              key={`${item.size}`}
              className={
                this.countQuantity(item.producers) > 0 ?
                  `size`
                :
                `size disable`
              }
              data-price={item.price}
              data-discount={item.discount}
              data-discountid={item.discountId}
              onClick={e => this.countQuantity(item.producers) > 0 ? this.handleSizeChoose(e) : console.log("sold out")}
            >
              {item.size}
            {
              item.discount > 0 ?
                <img 
                  src={require("../../../../assets/img/Sale-Free-Download-PNG.png")} 
                  alt=""
                  className="img-sale"
                />
              :
                <></>
            }
            {
              this.countQuantity(item.producers) > 0 ?
                <></>
              :
                <img 
                  src={require("../../../../assets/img/Sold-Out-Transparent.png")} 
                  alt=""
                  className="img-sold-out"
                />
            }
            </p>
          )  
        })
      :
        <></>
    )
  }

  render() {
    const { isLoading, data, price } = this.state,
          { formatVND } = common;
          console.log(this.props);
    return(
      <div id="detail">
        <Loader isLoad={isLoading} />
        <div>
          <div className="row">
            <aside className="col-sm-5 border-right">
              <article className="gallery-wrap"> 
                <div className="img-big-wrap">
                  <img src={data && data.image} alt={data && data.name} />
                </div> {/* slider-product.// */}
              </article> {/* gallery-wrap .end// */}
            </aside>
            <aside className="col-sm-7">
              <article className="card-body p-5">
                <h3 className="title mb-3">{data && data.name}</h3>
                <p className="price-detail-wrap"> 
                  <span className="price h3 text-warning"> 
                    <span className="currency">111</span>
                  </span>
                </p>
                <dl className="item-property">
                  <dt>Description</dt>
                  <dd><p>{data && data.description}</p></dd>
                </dl>
                <dl className="param param-feature">
                  <dt>Price</dt>
                  <dd>{formatVND(price)}</dd>
                </dl>  {/* item-property-hor .// */}
                <dl className="param param-feature">
                  <dt>Color</dt>
                  <dd>Black and white</dd>
                </dl>  {/* item-property-hor .// */}
                <dl className="param param-feature">
                  <dt>Delivery</dt>
                  <dd>Russia, USA, and Europe</dd>
                </dl>  {/* item-property-hor .// */}
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <div className="size-box">
                      <p className="size-box--text">Sizes:</p>
                      <div className="size-box--container">
                        {data && this.renderSizes(data.sizes)}
                      </div>
                    </div>  {/* item-property .// */}
                  </div> {/* col.// */}
                </div> {/* row.// */}
                <hr />
                <Link to="#" className="btn btn-lg btn-primary text-uppercase"> Buy now </Link>
                <Link to="#" className="btn btn-lg btn-outline-primary text-uppercase"> <i className="fas fa-shopping-cart" /> Add to cart </Link>
              </article> {/* card-body.// */}
            </aside> {/* col.// */}
          </div> {/* row.// */}
        </div> {/* card.// */}
        {/*container.//*/}
      </div>
    )
  }
}