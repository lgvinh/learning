import React from "react";
import ReactDOM from "react-dom";
import Loader from "../../Loader/LoadingModal";
import api from "../../../../api/callApi";
import common from "../../../Common";

export default class ForgetPassword extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            isLoading:false,
            message : []
        }
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
    }

    signinHandleSuccess = async (data) => {
        await this.setState({message: ["success", data.message]})
        console.log("input success");
    }

    signinHandleFailed = async (data) => {
            await this.setState({message: ["error", data.message]})
            console.log("input failed");
    }

    divA = (
        <div>
            Change Password Success
        </div>
    )
    divB = (
        <div>
            Password does not match
        </div>
    )
    divC = (
        <div>
            Password must more than 6 words
        </div>
    )

    toggleRender = async () => {
        const { validation } = common;
        let newPassword = this.password.current.value;
        let confirmPassword = this.confirmPassword.current.value;
        let message = validation({newPassword,confirmPassword})
        if(message.length > 0)
        {
            this.signinHandleFailed(message);
            ReactDOM.render(this.divC, document.getElementById("test"));
        } else {
            if(newPassword !== confirmPassword  ){
                console.log("bbb");
                ReactDOM.render(this.divB, document.getElementById("test"));
            }
                else if (newPassword.length < 6 || confirmPassword.length < 6)
                {
                    ReactDOM.render(this.divC, document.getElementById("test"));
                }
                else{
                const { url } = this.props;
                let token = url.replace("/verify/forget-password/", "");
                //console.log(url.replace("/verify/forget-password/", ""));
                this.setState({isLoading: true});
                let data = await api.verifyPass({newPassword, confirmPassword, token});
                if( data.status !==200 )
                {
                    console.log("error");
                    ReactDOM.render(this.divB, document.getElementById("test"));
                }
                else {
                    console.log("Aaa")
                    ReactDOM.render(this.divA, document.getElementById("test"));
                }
            }
            this.setState({isLoading:false});
        }
        //let url = this.props.url.substring(24, this.props.url.length);
        //var endpoint = url.split(".")[1];
        //var decodedString = atob(`${endpoint}`);
        //console.log(decodedString);
    }

    componentDidMount() {
        const { url } = this.props;
        console.log(url.replace("/verify/forget-password/", ""));
        this.setState({isLoading: true});
			const { isSignin, reset } = this.props;
			setTimeout(() => {
				console.log(isSignin);
				reset();
				this.setState({isLoading: false});
			}, 200);
    }

    render()
    {
        const{isLoading}=this.props;
        return(
            <div id="forgetpass" className="myform">
                <div id="test">

                </div>
                <div className="myform__container">
                    <Loader isLoad={isLoading}/>
                    <div className="myform__container--left">
                        <h1>Forget Password</h1>
                    </div>
                    <div>
                        <h3>Input new Password</h3>
                        <input type ="password"
                        name="password"
                        id="password"
                        required={true}
                        placeholder="- - - - - -"
                        ref={this.password}/>
                    </div>
                    <div>
                        <h3>Confirm Password</h3>
                        <input type ="password"
                        name="confirm_password"
                        id="confirm_password"
                        required={true}
                        placeholder="- - - - - -"
                        ref={this.confirmPassword}
                        />
                    </div>
                    <button type="submit" onClick={() => this.toggleRender()}>Submit</button>
                </div>
            </div>
        )
    }
}