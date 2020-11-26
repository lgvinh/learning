import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thSize } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";

export default class Size extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  renderListSize = data => {
    return data && data.map( item => {
      return (
        <tr 
          key={item.id}
        >
          <td>
            <Link className="text-primary" to={`/admin/size/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td className="text-center">
            <Button bsStyle="danger" fill onClick={() => this.handleDeleteSize(item.id)}>
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
      let data = await get("api/size");
      if ( data.status === 200 ) {
        this.setState({data: data.result});
      } else console.log("error");
    } catch (error) {
      console.log("error", error);
    }
  }

  handleDeleteSize = async id => {
    const { delete: del } = api,
          { handleClick } = this.props;
    let data = await del("api/size/" + id);
    if ( data.status === 200 ) {
      await this.getData();
      handleClick("tr", "create size success");
    } else 
      handleClick("tr", "create size failed", "error");
  }

  render() {
    const { data } = this.state;
    return (
      <div id="size">
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
                        {thSize.map((prop, key) => {
                          if (key !== thSize.length - 1)
                            return <th key={key}>{prop}</th>;
                          else 
                            return <th key={key} className="text-center">
                              <Link to="/admin/add-size" className="text-primary" style={{fontWeight: "bold"}}>
                                {prop}
                              </Link>
                            </th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListSize(data)
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