import React from "react";
import ReactDOM from "react-dom";
import common from "../../../Common";
import api from "../../../../api/callApi";
export default class ChangePassword extends React.Component{

    constructor(props) {
			super(props)
			this.state={
					message : []
			}
			this.password = React.createRef();
			this.confirmPassword = React.createRef();
			this.oldPassword = React.createRef();
    }

    signinHandleSuccess = async (data) => {
			await this.setState({message: ["success", data.message]})
			console.log("input success");
    }

    signinHandleFailed = async (data) => {
			await this.setState({message: ["error", data.message]})
			console.log("input failed");
    }

    handleUpdate = async () => {
			const { isSignin, handleLoader } = this.props,
						{ validation } = common;
			let id = isSignin.result.id;
			let old_pass = document.getElementById("old_password"),
					pass = document.getElementById("password"),
					confirm_pass= document.getElementById("confirm_password");
			let message = validation({old_pass,pass, confirm_pass});
			if (message.length > 0) {
				this.signinHandleFailed({message});
				ReactDOM.render(this.divC, document.getElementById("test"));
			}
			else if ( pass.value !== confirm_pass.value ) {
				this.signinHandleFailed(message);
				ReactDOM.render(this.divD, document.getElementById("test"));
			}
			else {
				handleLoader(true);
				let data = await api.changePass( {id,oldPass: old_pass.value,pass: pass.value, confirmPass: confirm_pass.value});
				console.log(data);
				if (data.status !== 200) {
					ReactDOM.render(this.divB, document.getElementById("test"));
					this.signinHandleFailed(data);
				} else {
					ReactDOM.render(this.divA, document.getElementById("test"));
					this.signinHandleSuccess(data);
				}
			}
			handleLoader(false);
    }

    divA = (
			<div>
					Success
			</div>
		)
    divB = (
			<div>
					Failed
			</div>
	)
	divC = (
		<div>
				Password must be more than 6 words
		</div>
	)
	divD = (
		<div>
				Password does not match
		</div>
	)

    render() {
			return(
				<form 
					id="forgetpass" 
					className="myform tab--content"
					onSubmit={ e => e.preventDefault() }
				>
					<div id="test">

					</div>
					<div className="profile--content change--pass">
						<div className="profile--content__input">
            	<label htmlFor="old_password">Old Password</label>
							<input 
								type ="password"
								name="old_password"
								id="old_password"
								className="form-profile" 
								required={true}
								placeholder="- - - - - -"
								ref={this.oldPassword}
								autoComplete="true"
							/>
							<p className="border-bot__input"></p>
						</div>
						<div className="profile--content__input">
            	<label htmlFor="password">New Password</label>
							<input 
								type ="password"
								name="password"
								id="password"
								required={true}
								className="form-profile"
								placeholder="- - - - - -"
								ref={this.password}
								autoComplete="true"
							/>
							<p className="border-bot__input"></p>
						</div>
						<div className="profile--content__input">
            	<label htmlFor="confirm_password">Confirm Password</label>
							<input 
								type ="password"
								name="confirm_password"
								id="confirm_password"
								required={true}
								className="form-profile" 
								placeholder="- - - - - -"
								ref={this.confirmPassword}
								autoComplete="true"
							/>
							<p className="border-bot__input"></p>
						</div>
						<button 
							type="submit"  
							className="update--btn"
							onClick={() => this.handleUpdate()}
						>
							Submit
						</button>
					</div>
				</form>
			)
    }
    
}