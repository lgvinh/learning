import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCartAction, removeCartItemAction, loadCartAction, clearCart } from "../actions/cartAction";
import { signinAction } from "../actions/signinAction";
// import cursorAnimation from "./cursorAnimation";
import AOS from "aos";

// IE 11 run
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

// css/scss
import '../assets/css/bootstrap.min.css';
import '../assets/scss/style.scss';
import "../assets/css/aos.css";

// API
import api from "../api/callApi";

// Layout
import Header from './src/header';
import Footer from './src/Footer';
import Home from './src/Page/home';
import Detail from './src/Page/Detail';
import Contact from './src/Page/Contact';
import Cart from "./src/Page/Cart";
import Signin from "./src/Page/Signin";
import Signup from "./src/Page/SignUp";
import Signout from "./src/Page/Signout";
import Profile from "./src/Page/Profile";
import VerifySignUp from "./src/Page/Verify/VerifySignUp";
import ForgetPass from "./src/Page/ForgetPass";
import About from "./src/Page/About";
import Error from "./src/Page/Error";
import ForgetPassword from './src/Page/Verify/VerifyForgetPassword';
import AllProduct from './src/Page/AllProduct/AllProduct'
import Branch from './src/Page/AllProduct/Branch';
import Checkout from "./src/Page/Checkout";


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isSignin: false
    }
  }

  static getDerivedStateFromProps() {
    require("dotenv").config();
    return null;
  }

  async componentDidMount() {
    const { signinAction, loadCartAction } = this.props;
    this.scrollTop();
    AOS.init();
    let token = localStorage.getItem("token"),
        cart = localStorage.getItem("cart");
    if ( token && token !== "" ) {
      let user = await api.get("api/user/info");
      if ( user && user.status === 200 )
        signinAction(user);
      else {
        localStorage.removeItem("token")
      }
    }
    if ( cart && cart !== "") {
      loadCartAction(JSON.parse(cart));
    }
  }

  scrollTop = () => {
    let header = document.getElementsByTagName("header")[0],
        scrollTop = document.getElementById("scroll-top");

    window.addEventListener("scroll", () => {
      if ( window.scrollY > header.offsetHeight*3 ) {
        scrollTop.className = "active";
      } else {
        scrollTop.className = "";
      }
    });
    scrollTop.addEventListener("click", () => {
      window.scroll({top: 0, behavior: "smooth"});
    });
  }

  reset = () => {
    const iconMobile = document.getElementById("icon-menu-mobile"),
          mobileMenu = document.getElementById("mobile-menu"),
          darkBgMobile = document.getElementById("dark-bg");
    
    window.scroll({top: 0, behavior: "smooth"});
    if ( 
      iconMobile &&
      mobileMenu
     ) {
       iconMobile.className = "";
       mobileMenu.className = "";
       darkBgMobile.className = "";
     }
  }

  render() {
    const { cart, addToCartAction, removeCartItemAction, signinAction, isSignin, clearCart } = this.props;
    return (
      <BrowserRouter>
        < Header 
          isSignin={isSignin} 
          cart={cart} 
          removeItem={removeCartItemAction}  
          signinAction={signinAction}
        />
        <main id="container">
          <div className="cursor"></div>
          <div id="dark-bg"></div>
          <div id="mobile-menu">
            <p>aaa</p>
            {
                isSignin && Object.entries(isSignin).length > 0 && isSignin.status === 200 ? (
                 <>
                   <p>Hi {isSignin.result.firstName}</p>
                  <Link to="/profile">Profile</Link>
                  <Link to="/signout">Sign Out</Link>
                 </>
               )
               :
               <Link to="/signin">Sign In</Link>
            }
          </div>
          <div id="scroll-top"></div>
          <Switch>
            <Route 
              exact path="/" 
              render={({history}) => < Home addToCartAction={addToCartAction} history={history} reset={this.reset} /> }
            />
            <Route 
              exact path="/about-us" 
              render={() => < About reset={this.reset} /> }
            />
            <Route
              exact path="/detail/:id"
              render={() => < Detail reset={this.reset} />}
            />
            <Route 
              exact path="/contact"
              render={({history}) => < Contact history={history} reset={this.reset} />}
            />
            <Route 
              exact path="/cart"
              render={({history}) => < Cart history={history} cart={cart} reset={this.reset} />}
            />
            <Route 
              exact path="/checkout"
              render={({history}) => < Checkout isSignin={isSignin} history={history} cart={cart} reset={this.reset} clearCart={clearCart} />}
            />
            <Route 
              exact path="/signin"
              render={({history}) => < Signin history={history} signinAction={signinAction} reset={this.reset} />}
            />
            <Route 
              exact path="/signup"
              render={({history}) => < Signup history={history} isSignin={isSignin} reset={this.reset} />}
            />
            <Route 
              exact path="/signout"
              render={({history}) => < Signout history={history} signinAction={signinAction} reset={this.reset} />}
            />
            <Route
              exact path="/forget-password"
              render={({history}) => < ForgetPass history={history} signinAction={signinAction} reset={this.reset} />}
            />
            <Route 
              path="/profile"
              render={({history, match: { path }}) => (
                <Switch>
                  <Route
                    exact path={`${path}/`}
                    render={ () => < Profile isSignin={isSignin} history={history} signinAction={signinAction} reset={this.reset} /> }
                  />
                  <Redirect to="/404" />
                </Switch>
              )}
            />
            <Route
              exact path="/allproduct"
              render={({history}) => < AllProduct history={history} reset={this.reset} addToCartAction={addToCartAction} />}
            />
            <Route
              exact path="/Branch"
              render={({history}) => < Branch history={history} reset={this.reset} />}
            />
            <Route
              path="/verify"
              render={({history, match: { path }}) => (
                <Switch>
                  <Route 
                    exact path={`${path}/`}
                    render={ () => history.push("/404") }
                  />
                  <Route 
                    exact path={`${path}/signup/:token`}
                    render={ ({match: {url}}) => < VerifySignUp reset={this.reset} history={history} url={url} /> }
                  />
                  <Route 
                    exact path={`${path}/forget-password/:token`}
                    render={ ({match: {url}}) => < ForgetPassword reset={this.reset} history={history} url={url} /> }
                  />
                  <Redirect to="/404" />
                </Switch>
              )}
            />
            <Route
              exact path="/404"
              render={() => < Error reset={this.reset} />}
            />

            <Redirect to="/404" />
          </Switch>
        </main>
        < Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProp = ({cart, isSignin}) => {
  return {
    cart,
    isSignin
  }
}

const mapActionToProp = (dispatch) => {
  return bindActionCreators({
    addToCartAction,
    removeCartItemAction,
    signinAction,
    loadCartAction,
    clearCart
  }, dispatch)
}

export default connect(mapStateToProp, mapActionToProp)(App);
