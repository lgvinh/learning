import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import api from "api/callApi";

export default class SizeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
  }

  async componentDidMount() {
    const { match: { params } } = this.props,
          { get } = api;
    let data = await get("api/size/" + params.id);
    if ( data.status === 200 )
      this.setState({data: data.result});
  }

  handleUpdateSize = async id => {
    const { handleClick } = this.props,
          { put } = api;
    let newSize = document.getElementsByClassName("form-control size")[0];
    let data = await put("api/size/" + id, {id: newSize.value});
    if ( data.status === 200 )
      handleClick("tr", "Update size success");
    else
      handleClick("tr", "Update size fail", "error");
  }

  render() {
    const { data } = this.state;
    return (
      <div id="size-detail">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Edit Size"
                content={
                  <form onSubmit={ e => e.preventDefault() }>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "id",
                          type: "text",
                          bsClass: "form-control size",
                          placeholder: "Size",
                          defaultValue: data && data.id
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdateSize(data.id)}>
                      Update
                    </Button>
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