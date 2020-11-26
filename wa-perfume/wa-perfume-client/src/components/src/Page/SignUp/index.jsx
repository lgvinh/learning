import React from "react";

import api from "../../../../api/callApi";
import MetaData from "../../../MetaData";
import Loader from "../../Loader/LoadingModal";

import common from "../../../Common";

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: []
    }
  }

  setStateHandle = ( message, isLoading= false ) => {
    this.setState({isLoading, message});
  }

  signupHandle = async () => {
    this.setState({isLoading: true});
    let firstName = document.getElementById("firstname").value,
        lastName = document.getElementById("lastname").value,
        phone = document.getElementById("phone").value,
        password = document.getElementById("password").value,
        email = document.getElementById("email").value,
        address = document.getElementById("address").value;

    if ( 
      firstName !== "" && lastName !== ""
      && phone !== "" && password !== ""
      && email !== "" 
    ) {
      const obj = {firstName, lastName, phone, password, email, address};
      const { post } = api;
      let data = await post("signup/user", obj);
      if ( data.status === 200 ) {
        this.setStateHandle(["success", data.message]);
      } else {
        this.setStateHandle(["error", data.message]);
      }
      console.log(data);
    } else {
      this.setStateHandle(["error", "Must fill fields have (*)"]);
    }
  }

  componentDidMount() {
    const { history, reset } = this.props,
          { inputAnimation } = common;
    reset();
    inputAnimation();
    let token = localStorage.getItem("token");
    if ( token !== null ) {
      history.push("/");
    }
  }

  render() {
    const { isLoading, message } = this.state;
    return (
      <div id="signup">
        <MetaData
          title = "W.A Perfume Shop | Sign Up"
          description="Sign up page"
          ogTitle="W.A Perfume Shop | Sign Up"
        />
        <Loader 
          isLoad = {isLoading}
        />
        <form onSubmit={ e => e.preventDefault()} className="myform__container--right">
          <div className="main-content signin-form">
            {
              message.length > 0 ?
              <p className={`message ${message[0]}`}>{message[1]}</p>
              :
              <p></p>
            }
            <div className="c-input-eff input--content">
              <input 
                type="text" 
                name="firstname"
                id="firstname"
                required={true}
              />
              <label htmlFor="firstname">*First Name</label>
            </div>
            <div className="c-input-eff input--content">
              <input 
                type="text" 
                name="lastname" 
                id="lastname"
                required={true}
              />
              <label htmlFor="lastname">*Last Name</label>
            </div>
            <div className="c-input-eff input--content">
              <input 
                type="text" 
                name="phone" 
                id="phone"
                required={true}
              />
              <label htmlFor="phone">*Phone Number</label>
            </div>
            <div className="c-input-eff input--content">
              <input 
                type="password" 
                name="password" 
                id="password"
                autoComplete="on"
                required={true}
              />
              <label htmlFor="phone">*Password</label>
            </div>
            <div className="c-input-eff input--content">
              <input 
                type="text" 
                name="email" 
                id="email"
                required={true}
              />
              <label htmlFor="email">*Email</label>
            </div>
            <div className="c-input-eff input--content">
              <input 
                type="text" 
                name="address" 
                id="address"
                required={true}
              />
              <label htmlFor="address">Address</label>
            </div>
            <button
              id="submit-btn"
              onClick = { () => this.signupHandle() }
            >Sign Up</button>
            <p>(*): required</p>
            {/* {
              message && message.length > 0 ?
              <p className={`message ${message[0]}`}>{message[1]}</p>
              :
              ""
            } */}
          </div>
        </form>
      </div>
    )
  }
}