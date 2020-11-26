import React from 'react';
import {
  Link
  } from 'react-router-dom';
import Product from './product';

//Data
var data = require('./../assets/data/product.json');
const vals = Object.values(data);


// ----------------------------
// -------Favorite Product-----
// ----------------------------
class FavProduct extends React.Component {
  render() {
    return (
      <div className="favorite">
        {/* thumbnail */}
        <Link to="/">
          <img src={this.props.url} alt=""/>
        </Link>
        {/* title */}
        <h4>{this.props.name}</h4>
        {/* Description */}
        <span>xxx</span>
        <button>Shop now</button>
      </div>
    )
  }
}
// -----end Favorite Product----

// ---------------------------------
// -------New Product's wrapper-----
// ---------------------------------
var newPduct = [];
for(const val of vals) {
  newPduct.push(
    < Product 
        key = {val["id"]} 
        id = {val["id"]} 
        name = {val.name} 
        price = {val["price"]} 
        url = {val["url"]} 
        // display={"d-none"} 
    />
  )
}

var NewProductContainer = (
  <div className="new-product-container">
    <p><span>Sản Phẩm Mới</span></p>
    <div className="new-product">
      {newPduct}
    </div>
    <button className="more-product">Xem thêm</button>
  </div>
)
// -----end New Product's wrapper------

// --------------------------------------
// -------Favorite Product's wrapper-----
// --------------------------------------
var favPduct = [];
var j = 0;

for (const val of vals) {
  favPduct.push(
    < FavProduct key = {val["id"]} name={val["name"]} price = {val["price"]} url={val["url"]} />
  )
  j++;
  if(j===3) {break;}
}

var FavProductContainer = (
  <div className="fav-product-container">
    <p><span>Sản Phẩm Yêu Thích</span></p>
    <div className="fav-product">
      {favPduct}
    </div>
  </div>
)
// -----end Favorite Product's wrapper------


//----------------------
//--------Main----------
//----------------------
export default class Index extends React.Component {

  componentWillMount() {
    if(!sessionStorage.getItem("newToWeb")) {
      sessionStorage.setItem("newToWeb", true);
    }
  }

  componentDidMount() {
    const darkBg = document.getElementById("dark-bg"),
          popUp = document.getElementById("pop-up");
    if(sessionStorage.getItem("newToWeb") === "true") {
      darkBg.onclick = () => {
        darkBg.className = "hide";
        popUp.className = "hide";
        sessionStorage.setItem("newToWeb", false);
      }
    } else {
      darkBg.style.display = "none";
      popUp.style.display = "none";
    }
  }

  render() {
    return (
      <div id="index">
        <div id="dark-bg"></div>
        <div id="pop-up">
          <p>Lưu Ý: <br/>
            - Trang web này thật sự không thuộc quyền sở hữu của tôi. Mục đích xây dựng trang web là giành cho việc học tập của chính bản thân không vì mục đích thương mại<br/>
            <br/>
            - Tên miền thật của web này tại đây <a href="https://realclothes.me/" target="_blank">ĐÂY</a>
          </p>
          <br/>
          <br/>
          <p>Note: <br/>
            - This website isnt mine. I build this for learning purpose only<br/>
            <br/>
            - You can check the real website at <a href="https://realclothes.me/" target="_blank">HERE</a>
          </p>
        </div>
        <div className="carousel">
          <img src="/img/carousel1.png" alt="carousel of site" />
        </div>
        <div className="content">
          { NewProductContainer }
          { FavProductContainer }
        </div>
      </div>
    )
  }
}