import React from 'react';
import { Link } from "react-router-dom";
import MetaData from "../../../MetaData";

import animation from "./animation";
import Loader from "../../Loader/LoadingModal";
import PreviewModal from "../../Modal/PreviewModal";
import ChooseSizeModal from "../../Modal/ChooseSizeModal";
import Product from "../../Product";
import { ReactComponent as Perfume } from "../../../../assets/SVG/perfume.svg";

import api from "../../../../api/callApi";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      preview: {
        isPreviewing: false
      },
      data: []
    }
  }

  preview = ( data ) => {
    document.documentElement.className = "disable";
    this.setState({
      preview: {
        isPreviewing: true,
        ...data
      }
    });
  }

  previewOff = () => {
    document.documentElement.className = "";
    this.setState({
      preview: {
        isPreviewing: false
      },
    });
  }

  renderListNewProduct = (data) => {
    return data && data.length > 0 && data.map( (item, index) => {
      if (item.status !== 0)
        return (
          <Product
            key={item.id}
            {...item}
            preview={this.preview}
            addFunc={this.handleAddFunc.bind(this)}
            duration={(index+1)*20}
          />
        )
      return ""
    });
  }

  renderListSaleProduct = (data) => {
    return data && data.length > 0 && data.map( (item, index) => {
      let haveDiscount = item.sizes.filter( p => p.discount > 0);
      if ( haveDiscount.length > 0 ) {
        return (
          <Product
            key={item.id}
            {...item}
            preview={this.preview}
            addFunc={this.handleAddFunc.bind(this)}
            duration={(index+1)*100}
          />
        )
      }
      return "";
    });
  }
  
  async componentDidMount() {

    const { reset, history } = this.props;
    let data;
    animation();
    reset();
    try {
      data = await api.getPerfume();
    } catch (error) {
      console.log(error);
      history.push("/404");
    }
    this.setState({isLoading: false, data: data && data.result ? data.result : null});
  }

  handleAddFunc = (product) => {
    this.setState({isLoading: true});
    this.props.addToCartAction(product);
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 200);
  }

  sectionDeviner = (
    <div className="section-diviner">
      <div>
        <Perfume />
      </div>
    </div>
  )

  render() {
    const { isLoading, preview, data } = this.state;
    return (
      <div id="home">
        <MetaData
          title = "W.A Perfume Shop | Home"
          description="Home page"
          ogTitle="W.A Perfume Shop | Home"
          // ogI
        />
        <Loader isLoad={isLoading} />
        <PreviewModal
          {...preview}
          previewOff={this.previewOff}
          addFunc={this.handleAddFunc}
        />
        <ChooseSizeModal

        />
        <div className="main-banner">
          <img src={require("../../../../assets/img/main-banner/perfume-background-hd-2560x1440-301965.jpg")} alt=""/>
          <div className="arrow-down"></div>
        </div>
        <div className="main-content">
          <section id="section-one" className="new-product container-wrapper product-wrapper" data-aos="zoom-out-left">
            <h3>
              New Products
              <p>
                Looking for new product?
                <span>Try these</span>
              </p>
            </h3>
            {this.sectionDeviner}
            <div className="new-product-content">
              {this.renderListNewProduct(data)}
            </div>
          </section>
          <section id="section-two" className="container-wrapper product-wrapper"  data-aos="zoom-out-left">
            <h3>
              Sale Products
              <p>
                We have some product on sale
                <span>Don't miss!!</span>
              </p>
            </h3>
            {this.sectionDeviner}
            <div className="new-product-content">
              {this.renderListSaleProduct(data)}
            </div>
          </section>
          <section id="section-three" className="container-wrapper product-wrapper">
            <h4  data-aos="fade-up" data-aos-duration={100}>
              Your Smile Is Our Goals :)
            </h4>
            <p  data-aos="fade-up" data-aos-duration={250}>
              Enjoy Yourself Here
            </p>
            <span data-aos="fade-up" data-aos-duration={400}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed fuga illum molestiae non dolores modi possimus, debitis reprehenderit doloribus suscipit reiciendis illo! Excepturi ipsam esse aut, reiciendis iusto perferendis nostrum!
            </span>
            <div data-aos="fade-up" data-aos-duration={700}>
              <Link to="/">
                Read more?
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
}