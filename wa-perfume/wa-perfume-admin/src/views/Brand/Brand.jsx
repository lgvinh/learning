import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thBrand } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";

export default class Brand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  renderListBrand = () => {
    const { data } = this.state;
    return data && data.map( item => {
      return (
        <tr 
          key={item.id}
        >
          <td>
            <Link className="text-primary" to={`/admin/brand/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {item.description}
          </td>
          <td className="text-center">
            <Button bsStyle="danger" fill onClick={() => this.handleDeleteBrand(item.id)}>
              Delete
            </Button>
          </td>
        </tr>
      )
    });
  }

  getData = async () => {
    const { get } = api;
    try {
      let data = await get("api/brand");
      if ( data.status === 200) {
        this.setState({data: data.result});
      } 
    } catch (error) {
      console.log("error", error);
    }
  }

  handleDeleteBrand = async id => {
    const { delete: deleteApi } = api,
          { handleClick } = this.props;
    let data = await deleteApi("api/brand/" + id);
    if ( data.status === 200 ) {
      handleClick("tr", "delete brand success");
      await this.getData();
    } else {
      console.log("error");
      handleClick("tr", "delete brand failed", "error");
      console.log(data);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div id="brand">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Brand Management"
                category="Manage brand in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thBrand.map((prop, key) => {
                          if (key !== thBrand.length - 1)
                            return <th key={key}>{prop}</th>;
                          else 
                            return <th key={key} className="text-center">
                              <Link to="/admin/add-brand" className="text-primary" style={{fontWeight: "bold"}}>
                                {prop}
                              </Link>
                            </th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListBrand()
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