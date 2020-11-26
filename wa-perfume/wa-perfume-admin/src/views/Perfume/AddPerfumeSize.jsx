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
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";

export default class AddPerfumeSize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      producers: [],
      sizes: [],
      data: {}
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { get } = api,
          { match: {params} } = this.props;
    let data = await get("api/perfume_detail/find-id/" + params.id),
        sizes = await get("api/size?limit=200"),
        producers = await get("api/producer?limit=200");
    if ( sizes.status === 200 && producers.status === 200 ) {
      this.setState({producers: producers.result, sizes: sizes.result, data: data.result});
    }
  }

  renderListOption = data => {
    return data.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name || item.id}
        </option>
      );
    });
  }

  handleCreateSize = async () => {
    const { post } = api,
          { match: {params}, handleClick } = this.props,
          { data: oldData } = this.state;
    let quantity = document.getElementById("quantity"),
        sizeId = document.getElementById("size"),
        producerId = document.getElementById("producer"),
        perfumeDetailId = params.id;
    let perfume_size = {
      quantity: quantity.value,
      sizeId: sizeId.value,
      producerId: producerId.value,
      perfumeDetailId,
      price: Number(oldData.price) * String(sizeId.value).replace("ml", "")
    };
    let data = await post("api/perfume/add", perfume_size);
    if ( data.status === 200 ) {
      handleClick("tr", "create perfume success");
    } else handleClick("tr", "create producer failed", "error");
    quantity.value = 0;
  }

  render() {
    const { producers, sizes } = this.state,
          { history, match: {params} } = this.props;
    return (
      <div id="add-perfume-size">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Perfume's size"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Perfume",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: this.props.match.params.id,
                          disabled: true
                        },
                        {
                          label: "Quantity",
                          type: "number",
                          bsClass: "form-control",
                          defaultValue: 0,
                          id: "quantity"
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
                            >
                              {this.renderListOption(sizes)}
                            </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={6} style={{paddingTop: 12}}>
                        <FormGroup>
                            <ControlLabel>Producer</ControlLabel>
                            <FormControl
                              rows="5"
                              componentClass="select"
                              bsClass="form-control"
                              id="producer"
                            >
                              {this.renderListOption(producers)}
                            </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="danger" style={{marginLeft: 20}} pullRight fill onClick={() => history.push(`/admin/perfume/${params.id}`)}>
                      Back
                    </Button>
                    <Button bsStyle="info" pullRight fill onClick={() => this.handleCreateSize()}>
                      Create Size
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