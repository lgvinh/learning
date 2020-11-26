import React from "react";
import { Link } from "react-router-dom";
import common from "../../../Common";
import MetaData from "../../../MetaData";
import api from "../../../../api/callApi";
// import Loader from "../../Loader/LoadingModal";
export default class ForgetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: []
    }
  }

  // setStateHandle = ( message, isLoading= false ) => {
  //   this.setState({isLoading, message});
  // }

  componentDidMount() {
    const { history, reset } = this.props,
          { inputAnimation } = common;
    reset();
    inputAnimation();
    let token = localStorage.getItem("token");
    if ( token !== null )
      history.push("/");
  }

  submitHandle = async ()=> {
    this.setState({isLoading: true});
    const { validation } = common;
    let email = document.getElementById("email");
    let message = validation({email});
    if ( message.length > 0 ) {
      console.log("Failed");
    }
    else {
      this.setState({isLoading: true});
      let data = await api.forgetPass({email: email.value});
      if (data.status !== 200)
      {
        console.log("Failed");
      }
      else {
        console.log("Success");
      }
    }
  }

  render() {
    return (
      <div id="forget-pass">
        <MetaData
          title = "W.A Perfume Shop | Forget Password"
          description="Forget password page"
          ogTitle="W.A Perfume Shop | Forget Password"
          // ogI
        />
        <form onSubmit={e => e.preventDefault()}>
          <div className="c-input-eff">
            <input 
              type="email" 
              name="email" 
              id="email"
              required={true}
            />
            <label htmlFor="email">Email</label>
          </div>
          <button onClick={() => this.submitHandle()}>
            submit
          </button>
          <Link to="/">Back to HomePage</Link>
        </form>
      </div>
    )
  }
}