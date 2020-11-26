import React from "react";
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
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
import common from "common";

export default class AddBrand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: false
    };
  }
  
  handleCreateBrand = async () => {
    const { post } = api,
          { handleClick } = this.props,
          { getBase64 } = common;
    let name = document.getElementsByClassName("form-control name")[0],
        description = document.getElementsByClassName("form-control description")[0],
        image = document.getElementById("add-brand-file");

    const brand = {
      name: name.value,
      description: description.value
    };
    if ( image.files && image.files[0]) {
      let base64Image = await getBase64(image.files[0]);
      brand["image"] = base64Image;
    }
    this.setState({isLoad: true});
    if ( name && description && name.value.length > 0 && description.value.length > 0) {
      let data = await post("api/brand/add", {...brand});
      if ( data.status === 200 ) {
        handleClick("tr", "create brand success");
        description.value = "";
        name.value = "";
      } else {
        console.log("error");
        handleClick("tr", data.message, "error");
      }
      this.setState({isLoad: false});
      image.value = "";
      document.getElementById("preview-name").innerHTML = "";
    }
  }

  render() {
    const { isLoad } = this.state;
    return (
      <div id="add-brand">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add brand"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Name",
                          type: "text",
                          bsClass: "form-control name",
                          placeholder: "Brand's name"
                        },
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Description</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control description"
                            placeholder="Brand's description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Image: </ControlLabel>
                          <div className="clearfix" />
                          <input 
                            accept="image/x-png,image/gif,image/jpeg" 
                            type="file" 
                            id="add-brand-file" 
                            style={{display: "none"}}
                            onChange={e => document.getElementById("preview-name").innerHTML = e.currentTarget.files[0].name}
                          />
                          <p id="preview-name">

                          </p>
                          <Button onClick={() => document.getElementById("add-brand-file").click()}>
                            Upload image
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="danger" pullRight fill onClick={() => this.props.history.push("/admin/brand")}>
                      Go back
                    </Button>
                    <Button bsStyle="info" pullRight fill style={{marginRight: 20}} onClick={() => this.handleCreateBrand()}>
                      Create brand
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