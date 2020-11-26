import React from "react";
import MetaData from "../../../MetaData";
import api from "../../../../api/callApi";

import Loader from "../../Loader/LoadingModal";
import { Link } from "react-router-dom";

import common from "../../../Common";

export default class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: []
    }
  }

  componentDidMount() {
    const { history, reset } = this.props,
          { inputAnimation } = common;
    reset();
    inputAnimation();
    let token = localStorage.getItem("token");
    if ( token !== null )
      history.push("/")
  }

  handleSigninSuccess = async (data) => {
    await this.setState({message: ["success", data.message]});
    this.handleMessage();
    console.log("login success");
  }

  handleSigninFail = async (data) => {
    await this.setState({message: ["error", data.message]});
    this.handleMessage();
    console.log("login fail");
  }

  handleMessage = () => {
    let message = document.getElementsByClassName("message");
    if ( message.length > 0 ) {
      let timeout;
      clearTimeout(timeout);
      message[0].style.opacity = 0;
      message[0].className = message[0].className.replace(/\serror|success/gm, "");
      timeout = setTimeout(() => {
        message[0].style = "";
        message[0].className += ` ${this.state.message[0]}`;
      }, 10)
    }
  }

  signinHandle = async () => {
    const { history } = this.props;
    const { validation } = common;
    let email = document.getElementById("email"),
        pass = document.getElementById("pass");
    let message = validation({email, pass});
    if ( message.length > 0 ) {
      this.handleSigninFail({message});
    } else {
      this.setState({isLoading: true});
      let data = await api.signin({email: email.value, password: pass.value});
      if ( data.status !== 200 ) {
        this.handleSigninFail(data);
      } else {
        const { signinAction } = this.props;
        localStorage.setItem("token", data && data.token);
        let user = await api.get("api/user/info");
        if ( user.status === 200 ) {
          signinAction(user);
          this.handleSigninSuccess(data);
          setTimeout(() => history.push("/"), 500);
        } else {
          this.handleSigninFail(data);
        }
      }
      this.setState({isLoading: false});
    }
  }

  componentWillUnmount() {
    this.setState({
      message: [],
    });
  }
  
  render() {
    const { isLoading, message } = this.state;
    return (
      <div id="signin" className="myform">
        <MetaData
          title = "W.A Perfume Shop | Sign In"
          description="Sign in page"
          ogTitle="W.A Perfume Shop | Sign In"
          // ogI
        />
        <Loader isLoad = { isLoading } />
        <div className="myform__container">
          <div className="myform__container--left">
            <h3>Sign In</h3>
            <p>
              Benefits for being a member:
            </p>
            <p>
              - Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, amet impedit molestias illum optio ab at laudantium, nam dolores voluptate mollitia error possimus! Velit repellat eum, aperiam aspernatur corporis minus?
            </p>
            <p>
              - Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, amet impedit molestias illum optio ab at laudantium, nam dolores voluptate mollitia error possimus! Velit repellat eum, aperiam aspernatur corporis minus?
            </p>
            <p>
              Join us by <Link to="/signup">sign up</Link> now
            </p>
            <p>
              Forget your password? <Link to="/forget-password">Click here</Link>
            </p>
          </div>
          <form onSubmit={ e => e.preventDefault()} className="myform__container--right">
            <div className="main-content signin-form">
              <div className="c-input-eff">
                <input 
                  type="email"
                  name="email"
                  id="email"
                  placeholder="abcxyz@abc.com"
                  required={true}
                />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="c-input-eff">
                <input 
                  type="password" 
                  name="pass" 
                  id="pass"
                  autoComplete="on"
                  placeholder="- - - - - -"
                  required={true}
                />
                <label htmlFor="pass">Your Password</label>
              </div>
              <p className="f-s-12 mg-0-auto require-message">(*) Password's length cannot less than 6</p>
              <button 
                id="submit-btn"
                onClick = { () => this.signinHandle() }
              >Sign In</button>
              {
                message && message.length > 0 ?
                <p className="message">{message[1]}</p>
                :
                ""
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}