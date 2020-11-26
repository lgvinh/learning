import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thPerfumePage } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";

export default class Perfume extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getGender = gender => {
    switch (gender) {
      case 0:
        return "female"
      case 1:
        return "male"
      case 2:
        return "unisex"
      default:
        break;
    }
  }

  getStatus = status => {
    switch (status) {
      case 0:
        return "closed"
      case 1:
        return "open"
      default:
        break;
    }
  }

  renderListPerfume = data => {
    const { history } = this.props;
    return data.map( item => {
      return (
        <tr 
          key={item.id}
        >
          <td>
            <Link className="text-primary" to={`/admin/perfume/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {this.getGender(item.gender)}
          </td>
          <td>
            {item.brandName}
          </td>
          <td>
            {this.getStatus(item.status)}
          </td>
          <td style={{display: "flex", justifyContent: "center"}}>
            <Button bsStyle="info" fill onClick={() => history.push(`/admin/perfume/${item.id}`)}>
              Update
            </Button>
          </td>
        </tr>
      )
    });
  }

  getData = async () => {
    const { get } = api;
    try {
      let data = await get("api/perfume_detail/join/brand/all");
      if ( data.status === 200 ) {
        this.setState({data: data.result});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  render() {
    const { data } = this.state;
    return (
      <div id="perfume">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Perfume Management"
                category="Manage perfume in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {
                          thPerfumePage.map((prop, key) => {
                            if ( key < thPerfumePage.length - 1 )
                              return <th key={key}>{prop}</th>;
                            else
                              return (
                                <th key={key} className="text-center">
                                  <Link to="/admin/add-perfume">
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
                        data && this.renderListPerfume(data)
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