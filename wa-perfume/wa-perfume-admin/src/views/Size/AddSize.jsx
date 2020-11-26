import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import api from "api/callApi";

export default class AddSize extends Component {

  handleAddSize = async () => {
    console.log("aa");
    const { post } = api,
          { handleClick } = this.props;
    let size = document.getElementsByClassName("form-control size")[0];
    if ( size && size.value.length > 0 ) {
      let data = await post("api/size", {id: size.value});
      if ( data.status === 200 ) {
        size.value = "";
        handleClick("tr", "create size success");
      } else handleClick("tr", "create size failed", "error");
    } else handleClick("tr", "create size failed", "error");
  }

  render() {
    const { history } = this.props;
    return (
      <div id="add-size">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Size"
                content={
                  <form onSubmit={ e => e.preventDefault() }>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "id",
                          type: "text",
                          bsClass: "form-control size",
                          placeholder: "Name"
                        }
                      ]}
                    />
                    <Row>
                      <Button bsStyle="danger" pullRight fill style={{margin: 20}} onClick={() => history.push("/admin/size")}>
                        Go back
                      </Button>
                      <Button bsStyle="info" pullRight fill style={{margin: 20}} onClick={() => this.handleAddSize()}>
                        Add Size
                      </Button>
                    </Row>
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