import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thProducer } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";

export default class Producer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  renderListProducer = () => {
    const { data } = this.state;
    return data && data.map( item => {
      return (
        <tr 
          key={item.id}
        >
          <td>
            <Link className="text-primary" to={`/admin/producer/${item.id}`}>
              {item.id}
            </Link>
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {item.address}
          </td>
          <td>
            {item.phone}
          </td>
          <td className="text-center">
            <Button bsStyle="danger" fill onClick={() => this.handleDeleteProducer(item.id)}>
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
      let data = await get("api/producer");
      if ( data.status === 200) {
        this.setState({data: data.result});
      } 
    } catch (error) {
      console.log("error", error);
    }
  }

  handleDeleteProducer = async id => {
    const { delete: deleteApi } = api,
          { handleClick } = this.props;
    let data = await deleteApi("api/producer/" + id);
    if ( data.status === 200 ) {
      handleClick("tr", "delete producer success");
      await this.getData();
    } else {
      console.log("error");
      handleClick("tr", "delete producer failed", "error");
      console.log(data);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div id="producer">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Producer Management"
                category="Manage producer in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thProducer.map((prop, key) => {
                          if (key !== thProducer.length - 1)
                            return <th key={key}>{prop}</th>;
                          else 
                            return <th key={key} className="text-center">
                              <Link to="/admin/add-producer" className="text-primary" style={{fontWeight: "bold"}}>
                                {prop}
                              </Link>
                            </th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListProducer()
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