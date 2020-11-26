import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { signinAction } from "actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import api from "api/callApi";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-3.jpg";

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  handleNotificationClick = (position, content = `Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
  every web developer.`, level = "success") => {
    // var color = Math.floor(Math.random() * 4 + 1);
    // var level;
    // switch (color) {
    //   case 1:
    //     level = "success";
    //     break;
    //   case 2:
    //     level = "warning";
    //     break;
    //   case 3:
    //     level = "error";
    //     break;
    //   case 4:
    //     level = "info";
    //     break;
    //   default:
    //     break;
    // }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          {content}
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact path={prop.layout + prop.path}
            render={(props, history, match) => (
              <prop.component
                {...props}
                {...history}
                {...match}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return (
          <Route
            exact path={prop.path}
            render={(props, history, match) => (
              <prop.component
                {...props}
                {...history}
                {...match}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        )
      }
    });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  handleImageClick = image => {
    this.setState({ image: image });
  };

  handleColorClick = color => {
    this.setState({ color: color });
  };

  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if ( token && token !== "" ) {
      const { get } = api;
      let data = await get("api/admin/info");
      if ( data.status === 200 ) {
        const { signinAction } = this.props;
        signinAction({data});
        this.setState({ _notificationSystem: this.refs.notificationSystem });
        var _notificationSystem = this.refs.notificationSystem;
        _notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-smile" />,
          message: (
            <div>
              Welcome back admin <b>Vince</b> <br/> 
              A beautiful freebie for
              every web developer.
            </div>
          ),
          level: "error",
          position: "tr",
          autoDismiss: 15
        });
      } else {
        localStorage.removeItem("token");
        this.props.history.push("/login");
      }
    } else
      this.props.history.push("/login");
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    const { signinReducer } = this.props;
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            signinReducer={signinReducer}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
          </Switch>
          <Footer />
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


export default connect(mapStateToProp, mapActionToProp)(Admin);
