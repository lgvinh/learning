import React from "react";
import MetaData from "../..//../MetaData";

export default class Error extends React.Component {

  componentDidMount() {
    window.scroll({top: 0});
  }

  render() {
    return (
      <div id="error">
      <MetaData
        title = "W.A Perfume Shop | Error"
        description="Error page"
        ogTitle="W.A Perfume Shop | Error"
        // ogI
      />
        <p>Error</p>
        <p>Nothing to see here</p>
        <img src={require("../../../../assets/img/gif/nothing-to-see.gif")} alt=""/>
      </div>
    )
  }
}