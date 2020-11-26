import React from "react";
import {
  Grid,
  Row,
  Col,
  // FormGroup,
  Table
} from "react-bootstrap";
// import { Link } from "react-router-dom";

import { Card } from "components/Card/Card.jsx";
// import { FormInputs } from "components/FormInputs/FormInputs.jsx";
// import { UserCard } from "components/UserCard/UserCard.jsx";
// import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
// import common from "common";

import { thTransaction } from "variables/Variables.jsx";

export default class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log("aa");
  }

  getData = async () => {
    const { get } = api;
    let data = await get("api/transaction");
    console.log(data);
  }

  render() {
    return (
      <div id="transaction">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Transaction"
                category="List transaction"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thTransaction.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* {
                        data && this.renderListPerfume(listPerfume)
                      } */}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}