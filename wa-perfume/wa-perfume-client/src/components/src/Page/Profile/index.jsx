import React from "react";
import Loader from "../../Loader/LoadingModal";
import MetaData from "../../../MetaData";
// import {Link} from "react-router-dom"; 
// import ReactDOM from "react-dom";
// import api from "../../../../api/callApi";

import ProfileInfo from "./ProfileInformation";
import ChangePassword from "./ChangePassword";
import OrderHistory from "./OrderHistory";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      haveChange: false,
      message: [],
      tabContent: "profileInfo"
    }
    this.avatar = React.createRef();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.phone = React.createRef();
    this.dateOfBirth = React.createRef();
    this.address = React.createRef();
    this.previewImage = React.createRef();
    this.tabItem = [];
  }

  componentDidMount() {
    var flag = false;
    setTimeout(() => {
      const { reset, isSignin, history } = this.props;
      if ( isSignin.status === 200 ) {
        reset();
        this.setState({...isSignin.result});
      } else {
        history.push("/signin");
      }
      this.setState({isLoading: false});
      this.handleTabItem();
    }, 500);
    this.setState({haveChange: flag});
  }

  handleTabItem = () => {
    this.tabItem.forEach( item=> {
      item.addEventListener("click", e => {
        const { currentTarget } = e,
              { tab } = currentTarget.dataset;
        this.tabItem.forEach( tabItem => {
          tabItem.className = tabItem.className.replace(" active", "");
        });
        currentTarget.className += " active";
        this.setState({tabContent: tab})
      });
    });
  }

  setPreviewImage = input => {
    const { files } = input.avatar.current;
    if ( files && files[0]) {
      const img = files;
      let reader = new FileReader();
      reader.onload = e => {
        this.previewImage.current.className = this.previewImage.current.className.replace(" show", "");
        setTimeout(() => {
          this.previewImage.current.className += " show";
          this.previewImage.current.src = e.target.result;
          this.previewImage.current.width = 150;
          this.previewImage.current.height = 200;
        }, 300);
      }
      reader.readAsDataURL(img[0]);
    }
  }

  handleLoader = isLoading => {
    if (typeof isLoading === "boolean") this.setState({isLoading});
  }

  handleTabContent = content => {
    const { isSignin, signinAction, reset } = this.props;
    const { result } = isSignin;
    // const {MyPrintableComponent} = MyPrintableComponent;
    switch (content) {
      case "profileInfo":
        return (
          <ProfileInfo 
            result={result}
            avatar={this.avatar}
            isSignin={isSignin}
            signinAction={signinAction}
            reset={reset}
            handleLoader={this.handleLoader}
          />
        )
      case "changePassword":
        return (
          <ChangePassword
            result={result}
            isSignin={isSignin}
            handleLoader={this.handleLoader}
          />
        )
      case "orderHistory":
        return (
          <OrderHistory
            // result={result}
            // isSignin={isSignin}
            // MyPrintableComponent = {MyPrintableComponent}
            handleLoader={this.handleLoader}
          />
        )
      default:
        break;
    }
  }

  render() {
    const { isSignin } = this.props;
    const { result } = isSignin;
    const { isLoading, avatar, tabContent } = this.state;
    return (
      <div id="profile">
        <MetaData
          title = "W.A Perfume Shop | Profile"
          description="Profile user page"
          ogTitle="W.A Perfume Shop | Profile"
          // ogI
        />
        <Loader
          isLoad={isLoading}
        />
        {
          isSignin && isSignin.status && isSignin.status === 200 ?
          <>
            <div className="profile--container">
              <h3 className="user-name">User's name: {result.firstName}</h3>
              <p className="user-id">ID: {result.id}</p>
              <figure className="profile__image">
                <img src={avatar && avatar.length > 0 ? avatar : require("../../../../assets/img/user_image.png")} alt="avatar user"/>
                <label htmlFor="avatar-choose">
                  Upload Image
                  <input type="file" name="" id="avatar-choose" accept="image/x-png,image/gif,image/jpeg" ref={this.avatar} onChange={() => this.setPreviewImage(this)}/>
                </label>
              </figure>
              <div className="profile--content preview-image">
                <img src="#" className="preview-image__content" alt="preview img" ref={this.previewImage}/>
              </div>
              <div className="profile--container__main">
                <ul className="tab--menu">
                  <li 
                    className="tab--menu__item active" 
                    data-tab="profileInfo" 
                    ref={ref => this.tabItem[0] = ref}
                  >
                    Profile Information
                  </li>
                  <li 
                    className="tab--menu__item" 
                    data-tab="changePassword"
                    ref={ref => this.tabItem[1] = ref}
                  >
                    Change Password
                  </li>
                  <li 
                    className="tab--menu__item"
                    data-tab="orderHistory"
                    ref={ref => this.tabItem[2] = ref}
                  >
                    Order History
                  </li>
                </ul>

                {this.handleTabContent(tabContent)}
              </div> 
            </div>
          </>
          :
          <></>
        }
      </div>
    )
  }
}