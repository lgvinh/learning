import React from "react";
import { Link } from "react-router-dom";
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
import moment from "moment";

export default class PerfumeSizeDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      processing: false
    };
  }

  async componentDidMount() {
    await this.getData();
    this.handleFormatVND();
  }

  getData = async () => {
    const { get } = api;
    try {
      let brand = await get("api/brand/all");
      if ( brand.status === 200) {
        this.setState({brands: brand.result});
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleFormatVND = () => {
    const { formatVND } = common;
    let price = document.getElementById("price");
    if (price)
      price.addEventListener("input", e => {
        const {currentTarget: target} = e
        target.value = formatVND(target.value, ",", "");
        target.dataset.price = target.value.replace(/\D/g, "");
      });
  }


    //               Q3 ------------------------------ Q2
    //             x |                               x |
    //           x   |                             x   |
    //         x     |                           x     |
    //       x       |                         x       |
    //     x         |                       x         |
    //   x           |                     x           |
    // P1 ------------------------------ P2            |
    // |            |                    |             |
    // |            |                    |             |
    // |            |                    |             |
    // |            |                    |             |
    // |           R3 -------------------|------------ R2
    // |         x                       |           x
    // |       x                         |         x
    // |     x                           |       x
    // |   x                             |     x
    // | x                               |  x
    // R2 ----------------------------- R1

  handleCreatePerfume = async () => {
    const { handleClick } = this.props,
          { post } = api,
          { getBase64 } = common;
    let name = document.getElementById("name"),
        price = document.getElementById("price"),
        gender = document.getElementById("gender"),
        style = document.getElementById("style"),
        musk = document.getElementById("musk"),
        lastLong = document.getElementById("last-long"),
        comeFrom = document.getElementById("come-from"),
        releasedAt = document.getElementById("released-at"),
        status = document.getElementById("status"),
        description = document.getElementById("description"),
        brand = document.getElementById("brand"),
        image = document.getElementById("add-perfume-file");
     const perfume = {
       name: name.value,
       price: price.dataset.price,
       gender: gender.value,
       style: style.value,
       musk: musk.value,
       lastLong: lastLong.value,
       comeFrom: comeFrom.value,
       releasedAt: moment(releasedAt.value).toISOString(),
       status: status.value,
       description: description.value,
       brandId: brand.value
     };
     if ( image && image.files[0] ) {
      perfume["image"] = await getBase64(image.files[0]);
     }

    this.setState({processing: true});
    let data = await post("api/perfume_detail/add", perfume);
    if ( data.status === 200 ) {
      handleClick("tr", "create perfume success");
      name.value = "";
      price.value = 0;
      price.dataset.price = 0;
      gender.value = "";
      style.value = "";
      musk.value = "";
      lastLong.value = "";
      comeFrom.value = "";
      releasedAt.value = "";
      status.value = "";
      description.value = "";
      brand.value = "";

    } else handleClick("tr", "create producer failed", "error");
    this.setState({processing: false});
  }

  renderListOption = data => {
    return data.map( item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      )
    });
  }

  render() {
    const { brands, processing } = this.state;
    return (
      <div id="perfume-size">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Create Perfume"
                content={
                  <form>
                    <Row>
                      <Col sm={8}>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "Perfume name",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Perfume name",
                              id: "name"
                            },
                            {
                              label: "Valuation",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Valuation",
                              id: "price",
                              defaultValue: 0,
                              "data-price": 0
                            }
                          ]}
                        />
                      </Col>
                      <Col md={4} style={{paddingTop: 12}}>
                        <FormGroup>
                          <ControlLabel>Gender</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="select"
                            bsClass="form-control"
                            id="gender"
                          >
                            <option value={1}>Male</option>
                            <option value={0}>Female</option>
                            <option value={2}>Unisex</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Style",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Style",
                          id: "style"
                        },
                        {
                          label: "musk",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Musk",
                          id: "musk"
                        },
                        {
                          label: "Last Long",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last long",
                          id: "last-long"
                        }
                      ]}
                    />
                    <Row>
                      <Col md={8}>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "Come from",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Come from",
                              id: "come-from"
                            },
                            {
                              label: "Released AT",
                              type: "date",
                              bsClass: "form-control",
                              id: "released-at"
                            }
                          ]}
                        />
                      </Col>
                      <Col md={4} style={{paddingTop: 12}}>
                        <FormGroup>
                            <ControlLabel>Status</ControlLabel>
                            <FormControl
                              rows="5"
                              componentClass="select"
                              bsClass="form-control"
                              id="status"
                            >
                              <option value={1}>Open</option>
                              <option value={0}>Close</option>
                            </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} style={{paddingTop: 12}}>
                        <FormGroup>
                            <ControlLabel>Brand</ControlLabel>
                            <FormControl
                              rows="5"
                              componentClass="select"
                              bsClass="form-control"
                              id="brand"
                            >
                              {brands && this.renderListOption(brands)}
                            </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup controlId="description">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Description"
                      />
                    </FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Image: </ControlLabel>
                          <div className="clearfix" />
                          <input 
                            accept="image/x-png,image/gif,image/jpeg" 
                            type="file" 
                            id="add-perfume-file" 
                            style={{display: "none"}}
                            onChange={e => {
                              if (e.currentTarget.files[0])
                                document.getElementById("preview-name").innerHTML = e.currentTarget.files[0].name;
                            }}
                          />
                          <p id="preview-name">

                          </p>
                          <Button onClick={() => document.getElementById("add-perfume-file").click()}>
                            Upload image
                          </Button>
                          {
                            processing ?
                              <p className="text-info">Processing</p>
                            :
                              <></>
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="danger" pullRight fill style={{marginLeft: 20}}>
                      <Link to="/admin/perfume" style={{color: "white"}}>
                        Cancel
                      </Link>
                    </Button>
                    <Button onClick={() => this.handleCreatePerfume()} bsStyle="success" pullRight fill>
                      Create Perfume
                    </Button>
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