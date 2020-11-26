import React from 'react';
import {Link} from 'react-router-dom';

// --------Component------
// -------New Product-----
// -----------------------
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ''
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     display: `${this.props.display}`
  //   })
  // }

  render() {
    return <Link to={"/single/" + this.props.id} className={`product `+ `${this.state.display}`}>
            <figure className="product-thumbnail">
              {/* thumbnail */}
              <img src={this.props.url} alt="" />
              {/* Choose Size */}
              <span className="size" >Chọn size</span>
              {/* Fast review */}
              <button className="fast-review">Xem nhanh</button>
            </figure>
            {/* Title */}
            <p className="product-title">{this.props.name}</p>
            {/* Price */}
            <span className="product-price">{this.props.price}</span>
          </Link>
  }
}