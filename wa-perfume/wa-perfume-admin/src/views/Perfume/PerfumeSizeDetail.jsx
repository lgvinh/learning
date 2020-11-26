import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";
import common from "common";

export default class PerfumeSizeDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sizes: [],
      size: ""
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { get } = api,
          { match: { params } } = this.props;
    try {
      let data = await get(`api/perfume/join/full/find-id/${params.size}`),
          size = await get("api/size");
      if ( data.status === 200 && size.status === 200 ) {
        this.setState({data: data.result, sizes: size.result, size: data.result.sizeId});
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderListOption = data => {
    return data.map( item => {
      return (
        <option key={item.id} value={item.id}>{item.id}</option>
      )
    });
  }

  handleUpdatePerfumeSize = async () => {
    const { put } = api,
          { match: {params}, handleClick } = this.props;
    let quantity = document.getElementById("quantity"),
        sizeId = document.getElementById("size");
    let perfume_size = {
      quantity: quantity.value,
      sizeId: sizeId.value,
      id: params.size
    };
    let data = await put("api/perfume/update/", perfume_size);
    if ( data.status === 200 ) {
      handleClick("tr", "Update perfume's size success");
    } else handleClick("tr", "Update perfume's size failed", "error");
  }

  render() {
    const { data, sizes, size } = this.state,
          { formatVND } = common,
          { match: {params}} = this.props;
    return (
      <div id="perfume-size">
        <Link to={`/admin/perfume/${params.id}`} style={{padding: 20, fontWeight: "bold", fontSize: 20, margin: "0 10"}}>
          Back
        </Link>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-9", "col-md-3"]}
                      properties={[
                        {
                          label: "ID",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "ID",
                          defaultValue: data && data.id,
                          disabled: true
                        },
                        {
                          label: "Price",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "price",
                          defaultValue: data && data.price && formatVND(data.price),
                          disabled: true
                        }
                      ]}
                    />
                    <Row>
                      <Col md={6} style={{paddingTop: 12}}>
                        <FormGroup>
                          <ControlLabel>Size</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="select"
                            bsClass="form-control"
                            id="size"
                            value={size}
                            readOnly={true}
                          >
                            {this.renderListOption(sizes)}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Quantity",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "Quantity",
                              defaultValue: data && data.quantity,
                              id: "quantity"
                            }
                          ]}
                        />
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Perfume Detail id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Perfume Detail Name",
                          defaultValue: data && data.perfumeDetail && data.perfumeDetail.id,
                          disabled: true
                        },
                        {
                          label: "Perfume detail name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: data && data.perfumeDetail && data.perfumeDetail.name,
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Producer's id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue: data && data.producer && data.producer.id,
                          disabled: true
                        },
                        {
                          label: "producer's name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country",
                          defaultValue:  data && data.producer && data.producer.name,
                          disabled: true
                        },
                        {
                          label: "producer's phone",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue:  data && data.producer && data.producer.phone,
                          disabled: true
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdatePerfumeSize()}>
                      Update Perfume's Size
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