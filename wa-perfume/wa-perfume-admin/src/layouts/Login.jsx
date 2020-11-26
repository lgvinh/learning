import React from "react";
import { Link } from "react-router-dom";
import api from "api/callApi";
import { signinAction } from "actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
  }

  loginHandle = async e => {
    const { post } = api,
          { signinAction, history } = this.props;
    e.preventDefault();
    let email = this.email.current.value,
        password = this.password.current.value;
    try {
      let data = await post("signin/admin", {email, password});
      if ( data.status === 200 ) {
        localStorage.setItem("token", data.token);
        signinAction({data});
        history.push("/admin/dashboard");
      }
    } catch (error) {
      console.log("error");
    }
  }

  async componentDidMount() {
    const { history, signinAction } = this.props,
          { get } = api;
    let token = localStorage.getItem("token");
    if ( token && token.length > 0 ) {
      let data = await get("api/admin/info");
      if ( data.status === 200) {
        signinAction({data});
        history.push("/admin/dashboard");
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  render() {
    return (
      <div id="login">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* Tabs Titles */}
            {/* Login Form */}
            <form onSubmit={e => this.loginHandle(e)}>
              <input 
                type="text" 
                id="login" 
                className="fadeIn second" 
                name="login" 
                placeholder="login"
                ref={this.email}  
              />
              <input 
                type="password" 
                id="password" 
                className="fadeIn third"
                name="login"
                placeholder="password"
                ref={this.password}  
              />
              <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
            </form>
            {/* Remind Passowrd */}
            <div id="formFooter">
              <Link className="underlineHover" to="#">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = ({signinReducer}) => {
  return {
    signinReducer
  }
}

const mapActionToProp = (dispatch) => {
  return bindActionCreators({
    signinAction
  }, dispatch)
}

export default connect(mapStateToProp, mapActionToProp)(Login);