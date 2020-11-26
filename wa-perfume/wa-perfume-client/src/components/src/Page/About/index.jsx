import React from "react";

import MetaData from "../../../MetaData";

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => {return (<div>{text}</div>);};
export default class About extends React.Component {

  static defaultProps = {
    center: {
      lat: 10.76,
      lng: 106.66
    },
    zoom: 50
  };
  componentDidMount() {
    const { reset } = this.props;
    reset();
  }
  
 
  
  render() {
    return (
      <div id="about">
        <MetaData
          title = "W.A Perfume Shop | About us"
          description="About us page"
          ogTitle="W.A Perfume Shop | About us"
        />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi distinctio dolorem hic maxime quis? Mollitia odit eligendi eum et dolorem quod? Architecto, inventore ipsa expedita perferendis sunt vitae repudiandae rerum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi distinctio dolorem hic maxime quis? Mollitia odit eligendi eum et dolorem quod? Architecto, inventore ipsa expedita perferendis sunt vitae repudiandae rerum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi distinctio dolorem hic maxime quis? Mollitia odit eligendi eum et dolorem quod? Architecto, inventore ipsa expedita perferendis sunt vitae repudiandae rerum.
        <div style={{ height: '50vh', width: '50%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAftD_Ggag3dTj-bthHzBnda-apekwtO2Y" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={10.762622}
              lng={106.660172}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}