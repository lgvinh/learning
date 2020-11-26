import React from "react";

import common from "../../Common";

export default class PreviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      discountId: "",
      discount: 0,
      size: "",
      price: 0,
      quantity: 1,
      addSuccess: false
    }
  }

  componentDidMount() {
    this.closingModal();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { id } = this.props;
    const { price, size, quantity } = this.state;
    if ( 
      id === nextProps.id &&
      price === nextState.price &&
      size === nextState.size &&
      quantity === nextState.quantity
    )
      return false;
    return true;
  }

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

  closingModal = () => {
    const { previewOff } = this.props;
    let close = document.getElementsByClassName("close-preview"),
        body = document.body,
        preview = document.getElementById("preview-modal");
    if ( close && close.length > 0) {
      close[0].addEventListener("click" , () => {
        preview.className = "";
        setTimeout( async () => {
          await this.setState({quantity: 1, addSuccess: false});
          previewOff();
        }, 400);
      });
    }
    window.addEventListener("resize", () => {
      if ( body.offsetWidth < 1024 ) {
        preview.className = "";
        setTimeout( async () => {
          await this.setState({quantity: 1, addSuccess: false});
          previewOff();
        }, 400);
      }
    })
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
                  `size${index === 0 ? " active": ""}`
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
                  src={require("../../../assets/img/Sale-Free-Download-PNG.png")} 
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
                  src={require("../../../assets/img/Sold-Out-Transparent.png")} 
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
    const { formatVND } = common;
    const { isPreviewing, id, name, image, description, previewOff, addFunc, sizes } = this.props;
    const { quantity, addSuccess, price, discount, size, discountId } = this.state;
    let body = document.body,
        preview = document.getElementById("preview-modal");
    return (
      <div id="preview-modal" className={`${isPreviewing && body.offsetWidth >= 1024 ? "show": ""}`}>
        <div 
          className="dark-bg"
          onClick={() => {
            preview.className = "";
            setTimeout( async () => {
              await this.setState({quantity: 1, addSuccess: false});
              previewOff();
            }, 100);
          }}
        ></div>
        <div id="modal">
          <span className="close-preview">x</span>
          <div className="preview-container">
            <div className="preview-container-left">
              <img src={image && image.length > 0 ? image : ""} alt=""/>
            </div>
            <div className="preview-container-right">
              <p className="title">{ name ? name : "" }</p>
              <p className="description"><b>Description:</b> {description ? description : ""}</p>
              <div className="size-box">
                <p className="size-box--text">Sizes:</p>
                <div className="size-box--container">
                  {
                    this.renderSizes(sizes)
                  }
                </div>
              </div>
              <p className="discount">
                <b>Discount: </b>{discount}%
              </p>
              <p className={"price"}>
                <b>Price:</b> {formatVND((price - price*discount/100))}
                {
                  discount > 0 ?
                    <span className="discounted">({formatVND(price)})</span>
                    :
                    ""
                }
              </p>
              <div className="quantity">
                <label htmlFor="quantity"><b>Quantity: </b></label>
                <div>
                  <button 
                    className="decrease"
                    onClick={() => this.quantityInput("decrease")}
                    onTouchEnd={() => this.quantityInput("decrease")}
                  ></button>
                  <input 
                    type="text" 
                    name="quantity" 
                    id="quantity"
                    value={quantity}
                    onChange={e => this.quantityInput("input", e.currentTarget.value)}
                  />
                  <button 
                    className="increase"
                    onClick={() => this.quantityInput("increase")}
                    onTouchEnd={() => this.quantityInput("increase")}
                  ></button>
                </div>
              </div>

              <p className="total">
                <b>Total: </b>
                {
                  formatVND((price - price*discount/100) * quantity)
                }
              </p>

              <button 
                className={`add-to-cart${sizes && this.countQuantityOnSizes(sizes) === 0 ? " disable" : ""}`}
                onClick={() => {
                  this.countQuantityOnSizes(sizes) > 0 ?
                  addFunc({id, name, price, image, discountId, discount, quantity, size})
                  :
                  console.log("sold out");
                } }
              >
                Add to cart
              </button>
              {
                addSuccess ?
                <p className="add-success">Thêm thành công</p>
                :
                <p className="add-success"></p>
              }
            </div>
          </div> 
        </div>
      </div>
    )
  }
}