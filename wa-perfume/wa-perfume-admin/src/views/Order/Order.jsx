import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thOrder } from "variables/Variables.jsx";
import moment from "moment";
import api from "api/callApi";

export default class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    const { get } = api;
    let data = await get("api/order");
    this.setState({data});
  }

  renderListOrder = list => {
    return list && list.map((item, key) => {
      let newStatus = {};
      switch (item.status) {
        case 0:
          newStatus.status="pending";
          newStatus.className = "info";
          break;
        case 1:
          newStatus.status="confirmed";
          newStatus.className = "success";
          break;
        case 2:
          newStatus.status="canceled";
          newStatus.className = "warning";
          break;
        case 3:
          newStatus.status="denied";
          newStatus.className = "danger";
          break;
        default:
          break;
      }
      return (
        <tr 
          key={key}
        >
          <td>
            <Link className="text-primary" to={`/admin/order/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td>
            {item.address}
          </td>
          <td>
            {moment(item.createdAt).format("HH:mm:ss (DD/MM/YYYY)")}
          </td>
          <td style={{fontWeight: "bold"}} className={`text-uppercase ` + newStatus.className}>
            {newStatus.status}
          </td>
          <td>
            {
              item.firstName ?
              <Link style={{fontWeight: "bold"}} className="text-primary text-uppercase" to={`/admin/user/${item.userId}`}>
                {item.firstName}
              </Link>
              :
              <p style={{fontWeight: "bold", margin: 0}} className="text-uppercase">
                null
              </p>
            }
          </td>
        </tr>
      );
    })
  }

  render() {
    const { data } = this.state;
    return (
      <div id="order">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Order Management"
                category="Manage order in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thOrder.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListOrder(data.result)
                      }
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