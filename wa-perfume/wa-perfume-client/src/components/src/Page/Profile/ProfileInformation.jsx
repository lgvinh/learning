import React from "react";
import ReactDOM from "react-dom";
import api from "../../../../api/callApi";

export default class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      haveChange: false,
      message: []
    }
    this.avatar = this.props.avatar;
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.phone = React.createRef();
    this.dateOfBirth = React.createRef();
    this.address = React.createRef();
    this.previewImage = React.createRef();
  }
  
  divA = (
    <div>
        Update Success
    </div>
  )
  divB = (
    <div>
        Update Failed
    </div>
  )

  updateHandleSuccess = async data => {
    await this.setState({message: ["success", data.message]})
    console.log("input success");
  }
  
  updateHandleFailed = async data => {
    await this.setState({message: ["error", data.message]})
    console.log("input failed");
  }

  getBase64 = file => {
    return new Promise((resovle, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resovle(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  updateProfileHandle = async () => {
    const { handleLoader } = this.props;
    handleLoader(true);
    const { files } = this.avatar.current;
    let base64;
    if ( files && files[0] ) base64 = await this.getBase64(files[0]);
    let date = new Date(this.dateOfBirth.current.value);
    try {
      const { isSignin, signinAction, reset } = this.props;
      const { result } = isSignin,
            user = {
              id: result.id,
              avatar: base64 ? base64 : null,
              firstName: this.firstName.current.value, 
              lastName: this.lastName.current.value,
              phone: this.phone.current.value,
              address: this.address.current.value,
              dateOfBirth: date.toISOString()
            };
      reset();
      let data = await api.updateProfile(user);
      if (data.status !== 200) {
        ReactDOM.render(this.divB, document.getElementById("update"));
        console.log(data.status);
        this.updateHandleFailed(data); 
      } else {   
        ReactDOM.render(this.divA, document.getElementById("update"));
        console.log(data.status);
        let user = await api.get("api/user/info");
        signinAction(user);
        this.updateHandleSuccess(data);
        window.location.reload();
      }
    } catch (error) {
      ReactDOM.render(this.divB, document.getElementById("update"));
      console.log(error);
    }
    handleLoader(false);
  }

  setPreviewImage = input => {
    const { files } = input.avatar.current
    if ( files && files[0]) {
      const img = files;
      let reader = new FileReader();
      reader.onload = e => {
        this.previewImage.current.src = e.target.result;
        this.previewImage.current.width = 150;
        this.previewImage.current.height = 200;
      }
      reader.readAsDataURL(img[0]);
    }
  }

  render() {
    const {  result } = this.props;
    return (
      <form
        id="profile--information" 
        className="tab--content"
        onSubmit={e => e.preventDefault()}
      >
        <div className="profile--content">
          <div className="profile--content__input">
            <label htmlFor="firstName">First Name</label>
            <input defaultValue={result.firstName} type="text" name="firstName" id="firstName" className="form-profile" ref={this.firstName}  />
            <p className="border-bot__input"></p>
          </div>
          <div className="profile--content__input">
            <label htmlFor="lastName">Last Name</label>
            <input defaultValue={result.lastName} type="text" name="lastName" id="lastName" className="form-profile" ref = {this.lastName}/>
            <p className="border-bot__input"></p>
          </div>
          <div className="profile--content__input">
            <label htmlFor="phone">Phone</label>
            <input defaultValue={result.phone} type="text" name="phone" id="phone"  className="form-profile" ref = {this.phone}/>
            <p className="border-bot__input"></p>
          </div>
          <div className="profile--content__input">
            <label htmlFor="email">Email</label>
            <input defaultValue={result.email} type="text" name="email" id="email" className="form-profile" disabled={true} />
            <p className="border-bot__input disable"></p>
          </div>
          <div className="profile--content__input">
            <label htmlFor="address">Address</label>
            <input defaultValue={result.address} type="text" name="address" id="address" className="form-profile" ref = {this.address}/>
            <p className="border-bot__input"></p>
          </div>
          <div className="profile--content__input">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input defaultValue={result.dateOfBirth && result.dateOfBirth.slice(0, 10)} type="date" name="dateOfBirth" id="dateOfBirth" className="form-profile" ref = {this.dateOfBirth}/>
            <p className="border-bot__input"></p>
          </div>
        </div>
        <button 
          id="update" 
          className="update--btn"
          onClick={() => this.updateProfileHandle()}
        >
          Save changes
        </button>
      </form>
    )
  }
}