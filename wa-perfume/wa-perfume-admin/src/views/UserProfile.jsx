import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
import common from "common";
import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      data : []
    }
  }

  async componentDidMount()
  {
    this.getData();
  }

  getData = async () => {
    const {get} = api,
    {match : {params}}= this.props,
          {removeAccents} = common;
          let token = localStorage.getItem("token");
          console.log("token", token)
    if(token !== null)
    {
      try {
        let data = await get("api/admin/info");
        console.log("data", data)
        if(data.status === 200)
        {
          this.setState({data: data.result});
        }
      }
      catch (error)
      {
        console.log("error", error)
      }
      
    }

  }
  handleUpdateAdmin = async id => {
    const {put} = api,
    { handleClick } = this.props,
    { match : { params } } = this.props;
    let phone = document.getElementsByClassName("phone")[0].value,
    email = document.getElementsByClassName("email")[0].value,
    name = document.getElementsByClassName("name")[0].value;
    const admin = {
      id,
      phone,
      email,
      name
    };
    try {
      this.setState({isLoad: true});
      let update = await put("api/admin/update" , {...admin});
      console.log("update.status",update.status)
      if ( update.status === 200 ) {
        this.getData();
        handleClick("tr", "update admin success");
      }
      else {
        console.log("error");
        handleClick("tr", "update admin failed", "error");
      }
    } catch (error) {
      console.log("error", error);
    }
    this.setState({isLoad: false});
  }
  render() {
    const {data} = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-3", "col-md-4"]}
                      properties={[
                        {
                          label: "Name",
                          type: "text",
                          bsClass: "form-control name",
                          placeholder: "Name",
                          defaultValue: data && data.name
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control email",
                          placeholder: "Email",
                          defaultValue: data && data.email
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "ID",
                          type: "text",
                          bsClass: "form-control id",
                          placeholder: "id",
                          defaultValue: data && data.id,
                          disabled: true
                        },
                        {
                          label: "Phone",
                          type: "text",
                          bsClass: "form-control phone",
                          placeholder: "Phone",
                          defaultValue: data && data.phone
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullRight fill type="submit" onClick={ ()=> this.handleUpdateAdmin(data.id)}>
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Vince"
                userName="Vince"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
