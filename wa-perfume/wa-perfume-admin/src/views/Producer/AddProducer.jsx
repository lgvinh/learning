import React from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap" ;

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";

export default class AddProducer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoad: false
        };
      }

      handleCreateProducer = async () => {
        const { post } = api,
        { handleClick } = this.props;

        let name = document.getElementsByClassName("form-control name")[0],
        address = document.getElementsByClassName("form-control address")[0],
        phone = document.getElementsByClassName("form-control Phone")[0];

        const producer = {
            name: name.value,
            address: address.value,
            phone: phone.value
          };
        this.setState({isLoad: true});
        if ( name && address && phone && name.value.length > 0 && address.value.length > 0 && phone.value.length > 0) {
          let data = await post("api/producer/add", {...producer});
          if ( data.status === 200 ) {
            handleClick("tr", "create producer success");
            address.value = "";
            name.value = "";
            phone.value = "";
          } else {
            console.log("error");
            handleClick("tr", "create producer failed", "error");
          }
          this.setState({isLoad: false});
        }
      }

      render() {
        const { isLoad } = this.state;
        return (
          <div id="add-producer">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    title="Add producer"
                    content={
                      <form>
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Name",
                              type: "text",
                              bsClass: "form-control name",
                              placeholder: "Producer's name"
                            },
                          ]}
                        />
    
                        <Row>
                          <Col md={12}>
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Address</ControlLabel>
                              <FormControl
                                rows="2"
                                componentClass="textarea"
                                bsClass="form-control address"
                                placeholder="Producer's address"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Phone</ControlLabel>
                              <FormControl
                                rows="2"
                                componentClass="textarea"
                                bsClass="form-control Phone"
                                placeholder="Producer's Phone"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button bsStyle="danger" pullRight fill onClick={() => this.props.history.push("/admin/producer")}>
                          Go back
                        </Button>
                        <Button bsStyle="info" pullRight fill style={{marginRight: 20}} onClick={() => this.handleCreateProducer()}>
                          Create producer
                        </Button>
                        {
                          isLoad ? 
                          <p className="text-info text-uppercase">Processing</p>
                          :
                          <></>
                        }
                        <div className="clearfix" />
                      </form>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        )
      }
    }