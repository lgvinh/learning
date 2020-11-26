import React from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  Table
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
import { thUserDetail } from "variables/Variables.jsx";

export default class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listPerfume: [],
      dataSize : [],
      isLoad: false
    }
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { get } = api,
          { match : { params } } = this.props;
      try {
        let data = await get("api/user/find-id/" + params.id);
        let dataSize = await get(`api/filter/order?userId=${params.id}`);
        console.log("dataSizestatus", dataSize)
        console.log("DATA", data)
        if ( data.status === 200 && dataSize.status === 200) {
          this.setState({data: data.result, dataSize: dataSize.result});
        }
      } catch (error) {
        console.log("error", error);
      }
    
  }

  handleUpdateUser = async id => {
    const { put } = api,
          { handleClick } = this.props,
          { match : { params } } = this.props;
    let  status = this.state.data.status;
    console.log("status", this.state.data.status )
    const user = {
      id: params.id,
      status: status,
    };
    try {
      this.setState({isLoad: true});
      let update = await put("api/user/update-status/" , user);
      console.log("update.status",update.status)
      if ( update.status === 200 ) {
        this.getData();
        handleClick("tr", "update user success");
      }
      else {
        console.log("error");
        handleClick("tr", "update user failed", "error");
      }
    } catch (error) {
      console.log("error", error);
    }
    this.setState({isLoad: false});
    document.getElementById("preview-name").innerHTML = "";
  }

  renderSize = sizes => {
    console.log("sizes",sizes)
    return sizes && sizes.map( (item, index) => {
        return (
          <tr 
             key={item.id}
          >
            <td>
              {index+1}
            </td>
            <td>
              <Link to={`/admin/order/${item.id}`}>
                {item.id}
              </Link>
            </td>
            <td>
              {item.userFirstName}
            </td>
            <td>
              {item.address}
            </td>
            <td>
              {item.userPhone}
            </td>
            {/* <td>
              {item.quantity}
            </td>
            <td>
            {formatVND(item.price)}
            </td> */}
          </tr>
        )
    });
  }

  render() {
    const { data, listPerfume, isLoad , dataSize} = this.state;
    console.log("sizes", dataSize)
    if(data.length > 0) 
      console.log("data.id", data.id)
    
    return (
      <div className="user-detail">
        <input 
          type="file" 
          accept="image/x-png,image/gif,image/jpeg" 
          id="user-img" 
          style={{display: "none"}}
          onChange={ e => document.getElementById("preview-name").innerHTML = e.currentTarget.files[0] && e.currentTarget.files[0].name}
        />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <UserCard
                bgImage={data.avatar}
                avatar={data.avatar}
                socials={
                  <div>
                      User's image
                    <p id="preview-name" style={{wordBreak: "break-all"}}>

                    </p>
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="Edit User"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-7", "col-md-5"]}
                      properties={[
                        {
                          label: "id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: data && data.id,
                          disabled: true
                        },
                        {
                          label: "Name",
                          type: "text",
                          bsClass: "form-control name",
                          defaultValue: data && data.firstName,
                          disabled: true
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <FormInputs
                            ncols={["col-md-7", "col-md-5"]}
                            properties={[
                              {
                                label: "Address",
                                type: "textarea",
                                bsClass: "form-control Address",
                                defaultValue: data && data.address,
                                disabled: true
                              },
                              {
                                label: "Email",
                                type: "textarea",
                                bsClass: "form-control email",
                                defaultValue: data && data.email,
                                disabled: true
                              }
                            ]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <FormInputs
                            ncols={["col-md-2", "col-md-1", "col-md-1"]}
                            properties={[
                              {
                                label: "Phone",
                                type: "textarea",
                                bsClass: "form-control phone",
                                defaultValue: data && data.phone,
                                disabled: true
                              },
                              {
                                label: "Active",
                                type: "radio",
                                bsClass: "form-control status",
                                checked: data.status === 1 ? true : false ,
                                value: 1,
                                onClick : () => {this.setState({data:{status : 1}})},
                                name: "status",
                                onChange: () => {}
                                // id: status
                              },
                              {
                                onChange: () => {},
                                label: "Lock",
                                type: "radio",
                                bsClass: "form-control status",
                                checked: data.status === 0 ? true : false ,
                                value: 0,
                                onClick : () => {this.setState({data:{status : 0}}); console.log('bbbbbb',this.state.data.status)},
                                name: "status"
                                // id: status
                              }
                            ]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdateUser(data.id)}>
                      Update User
                    </Button>
                    <div className="clearfix" />
                    {
                      isLoad ? 
                      <p className="text-info text-uppercase">Processing</p>
                      :
                      <></>
                    }
                  </form>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Order's User"
                category="List Oder"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thUserDetail.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataSize && this.renderSize(dataSize)
                        }
                      </tbody>
                    </Table>
                    <div className="clearfix" />
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}