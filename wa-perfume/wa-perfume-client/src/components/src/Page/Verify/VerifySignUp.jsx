import React from "react";

import api from "../../../../api/callApi";

export default class VerifySignUp extends React.Component {

  async componentDidMount() {
    const { post } = api;
    const { url } = this.props,
          token = url.replace("/verify/signup/", "");
    console.log("url", token);

    let result = await post("verify/signup", {token});
    if ( result.status === 200 ) {
      console.log("sign up success");
    } else {
      console.log("sign up fail");
    }
  }

  render() {
    return (
      <>
        <p>Success</p>
      </>
    )
  }
}