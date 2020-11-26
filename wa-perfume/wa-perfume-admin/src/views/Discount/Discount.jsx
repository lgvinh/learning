import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thDiscount } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import moment from "moment";

import api from "api/callApi";

export default class Discount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { get } = api;
    let data = await get("api/discount");
    if ( data.status === 200 ) {
      this.setState({data: data.result});
    } else console.log(data);
  }

  renderListDiscount = discount => {
    const { history } = this.props;
    return discount.map( item => {
      console.log(item);
      return (
        <tr 
          key={item.id}
        >
          <td>
            <Link className="text-primary" to={`/admin/discount/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td>
            {item.discount || 0}%
          </td>
          <td>
            {item.quantityLimit || "none"}
          </td>
          <td>
            {moment(item.startAt).format("HH:mm:ss (DD/MM/YYYY)")}
          </td>
          <td>
            {moment(item.endAt).format("HH:mm:ss (DD/MM/YYYY)")}
          </td>
          <td style={{display: "flex", justifyContent: "center"}}>
            <Button bsStyle="info" fill onClick={() => history.push(`/admin/discount/${item.id}`)}>
              Update
            </Button>
          </td>
        </tr>
      )
    });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div id="discount">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Discount Management"
                category="Manage discount in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          thDiscount.map((prop, key) => {
                            if ( key < thDiscount.length - 1 )
                              return <th key={key}>{prop}</th>;
                            else
                              return (
                                <th key={key} className="text-center">
                                  <Link to="/admin/add-discount">
                                    {prop}
                                  </Link>
                                </th>
                              )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListDiscount(data)
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