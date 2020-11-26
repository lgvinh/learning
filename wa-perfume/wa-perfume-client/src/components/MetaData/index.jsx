import React from "react";
import MetaTags from "react-meta-tags";

export default class Meta extends React.Component {
  render() {
    // eslint-disable-next-line
    const { title, description, ogTitle, ogImg } = this.props;
    return (
      <MetaTags>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={ogTitle} />
        {/* <meta property="og:image" content={ogImg} /> */}
      </MetaTags>
    )
  }
}