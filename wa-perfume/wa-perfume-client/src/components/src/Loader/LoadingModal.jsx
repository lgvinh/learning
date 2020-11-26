import React from "react";

export default class Loader extends React.Component {
  render() {
    const { isLoad } = this.props;
    return (
      <div>
        <div className={isLoad ? "darkBg show" : "darkBg"}></div>
        <div id="loader" className={isLoad ? "show" : ""}></div>
      </div>
    )
  }
}