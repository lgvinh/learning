import React from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

// JS
import * as func from '../assets/js/style.js';

// cart func
import * as actions from '../actions';

// Component
// import Product from './product.jsx';

// Data
var data = require('./../assets/data/product.json');
// const vals = Object.values(data[0]);

var getDetail = id => {
  var detail;
  data.forEach( val => {
    if( val['id'] == id ) {
      detail = val;
    }
  })
  return detail;
}

var cart = [];

// Detail 
var ProductDetail = () => {
  const { id } = useParams();
  const detail = getDetail(id);
  const cartAmount = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return <div className="product-detail">
    <div className="gallery">
      {/* Main top image */}
      <figure>
        <img src={`${detail.url}`} alt=""/>
      </figure>
      {/* Small images for select */}
      <img src="" alt=""/> {/* img 1 */}
      <img src="" alt=""/> {/* img 2 */}
      <img src="" alt=""/> {/* img 3 */}
    </div>
    <article className="detail">
      {/* title */}
      <h3 className="prd-name">
        {`${detail.name}`}
      </h3>
      {/* Category */}
      <p className="type">
        <strong>Type :</strong> Something ...
      </p>
      <p className="describe">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <span>
        Đơn giá: 
      </span>
      <span className="price">
        {`${detail.price}`}
      </span>
      <div className="choose-size">
        <p>Size</p>
        <div className="size-container" id="sizes">
          <div className="size active" onClick={func.chooseSizes}>XS</div>
          <div className="size" onClick={func.chooseSizes }>S</div>
          <div className="size" onClick={func.chooseSizes}>M</div>
          <div className="size" onClick={func.chooseSizes}>L</div>
          <div className="size" onClick={func.chooseSizes}>XL</div>
        </div>
      </div>
      <div className="add-cart">
        <label htmlFor="quantity">Số lượng</label>
        <div className="button dec" onClick={(e) => func.quantityFunc(e)}></div>
        <input type="text" className="quantity" name="quantity"/>
        <div className="button inc" onClick={(e) => func.quantityFunc(e)}></div>
        <button className="add" onClick={() => {
          dispatch(actions.addCart(cart))
        }}>
          Thêm vào giỏ {cartAmount.length}
        </button>
      </div>
    </article>
  </div>
}

// Related Product
// var RelaProduct = () => {
//   // function

//   var prductlist = [];

//   for (const val of vals) {
//     prductlist.push(
//       < Product key = {val["id"]} name = {val["name"]} price = {val["price"]} url = {val["url"]} />
//     )
//   }

//   return <BrowserRouter>
//     {prductlist}
//   </BrowserRouter>
// }

// Seen product
// var SeenProduct = () => {
//   return <div className="seen-product">
    
//   </div>
// }


// handleAddCart = () => {

// }

export default class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      size: 'xs',
      quantity: '1',
      price: '',
      total: ''
    }
  }

  componentDidMount() {
    // Default
    window.scrollTo(0,0);
    document.getElementsByClassName("quantity")[0].value = "1";

    // This happen when user reload page or
    // change page single on another product
    this.setState({
      name: document.getElementsByClassName("prd-name")[0].innerHTML,
      price: document.getElementsByClassName("price")[0].innerHTML,
      total: document.getElementsByClassName("price")[0].innerHTML
    })

    // Variables
    const sizes = document.getElementsByClassName("size"),
          quant = document.getElementsByName("quantity")[0],
          button = document.getElementsByClassName("button"),
          addCart = document.getElementsByClassName("add")[0];

    // Set size
    for(let i = 0; i < sizes.length; i++) {
      sizes[i].addEventListener("click", (e) => {
        this.setState({
          size: `${e.currentTarget.innerText}`,
          quantity: `${quant.value}`,
          total: `${quant.value * this.state.price}`
        })
      })
    }

    // Set quantity
    quant.addEventListener("change", () => {
      // prevent negative or NaN
      if(quant.value <= 0 || isNaN(quant.value)) {
        quant.value = "1"
      };
      this.setState({
        quantity: `${quant.value}`,
        total: `${quant.value * this.state.price}`
      })
    })
    
    for(let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", (e) => {
        let type = e.currentTarget.className;
        if (type.replace("button ","") === "dec") {
          this.setState({
            quantity: `${Number(quant.value) - 1}`,
            total: `${(Number(quant.value) - 1) * this.state.price}`
          })
        } else if (type.replace("button ","") === "inc") {
          this.setState({
            quantity: `${Number(quant.value) + 1}`,
            total: `${(Number(quant.value) + 1) * this.state.price}`
          })
        }
      })
    }

    // Add cart
    // addCart.addEventListener("click", () => {
    //   cart.push(this.state);
    //   console.log(cart);
    // })
  }

  render() {
    return <div className="single">
      < ProductDetail />
      <div className="policy-size">
        <div className="tabs">
          <button className="tab-btn active" onClick={ (e) => {func.changeTabs(e, "policies")} }>Chính Sách Cửa Hàng</button>
          <button className="tab-btn" onClick={ (e) => {func.changeTabs(e, "size-table")} }>Bảng Size</button>
        </div>
        {/* policies wrapper */}
        <div className="tab-content" id="policies">
          {/* policy 1 */}
          <article>
            <h4>A. Chính sách đổi trả sản phẩm</h4>
            <p>1. Tất cả sản phẩm đã mua sẽ không được hoàn trả bằng tiền mặt</p>
            <p>2. Sản phẩm còn mới nguyên, kèm tag và hoá đơn mua hàng, chưa qua sử dụng, sữa chữa hay giặt sẽ được đổi sản phẩm khác trong vòng 02 (hai) ngày và đổi size trong vòng 07 (bảy) ngày kể từ ngày mua hàng</p>
            <p>3. Chênh lệch về giá khi đổi hàng sẽ được hoàn trả bằng Store Credit hạn sử dụng 06 (sáu) tháng kể từ ngày đổi</p>
            <p>4. Không áp dụng chính sách đổi hàng/ hoàn trả bằng Store Credit với sản phẩm giảm giá</p>
            <p>5. Chỉ hỗ trợ đổi hàng một lần. Không hỗ trợ đổi hàng đối với sản phẩm đã được đổi một lần trước đó</p>
          </article>
          {/* policy 2 */}
          <article>
            <h4>B. Chính sách đặt hàng và ship hàng</h4>
            <p>1. Sản phẩm XS, S, S cộng, M, L đặt lại trong trường hợp hết hàng sẵn tại shop đều không có phụ phí</p>
            <p>2. Sản phẩm đặt size XL phụ phí 10%, size XXL phụ phí 20% giá trị sản phẩm</p>
            <p>3. Sản phẩm đặt dài thêm 1-5 cm phụ phí 5%, 6-10 cm phụ phí 10%, 11-20 cm phụ phí 20% trên giá trị sản phẩm</p>
            <p>4. MIễn phí ship đối với đơn hàng từ 1,5 triệu (áp dụng cho nội và ngoại thành TP HCM). Các đơn hàng khác có phí ship từ 15k - 35k tuỳ khu vực</p>
            <p>5. Tất cả các yêu cầu chỉnh sửa hay đặt hàng đều phải thanh toán 100% giá trị đơn hàng</p>
          </article>
        </div>
        {/* end polies wrapper */}
        <figure className="tab-content hide" id="size-table">
          <img src="/img/size-table.png" alt="the size table"/>
        </figure>
      </div>
      {/* < RelaProduct /> */}
    </div>
  }
}