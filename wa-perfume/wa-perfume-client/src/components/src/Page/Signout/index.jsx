import React from "react";

export default class Signout extends React.Component {

  componentDidMount() {
    const { history, signinAction } = this.props;
    let token = localStorage.getItem("token");
    if ( token === null ) {
      history.push("/");
    } else {
      localStorage.removeItem("token");
      signinAction();
      history.push("/");
    }
  }
  render() {
    return ""
  }
}