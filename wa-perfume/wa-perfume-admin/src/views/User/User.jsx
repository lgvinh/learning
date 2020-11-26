import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thUser } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from "api/callApi";
export default class User extends React.Component {

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
    let token = localStorage.getItem("token");
    if ( token !== null )
    {
      console.log("token", token)
      try {
        let data = await get("api/user/all");
        if ( data.status === 200) {
          this.setState({data: data.result});
        } 
      } catch (error) {
        console.log("error", error);
      }
    }
    
  }

  renderListUser = data => {
    console.log("dataaaa",data)
    return data.map( item => {
      return (
        <tr 
          key={item.id}
        ><td>
          <Link className="text-primary" to={`/admin/user/${item.id}`}>
              {item.id}
            </Link>
            </td>
          <td>
            {item.firstName}
          </td>
          <td>
            {item.phone}
          </td>
          <td className="text-center">
            <Button bsStyle="danger" fill >
              {item.status ===  1 ? "Active" : "Lock"}  
            </Button>
          </td>
        </tr>
      )
    });
  }

  // handleUpdateUser = async id => {
  //   const { handleClick } = this.props,
  //         { put } = api;
  //         let data = await put("api/user/update" + id);
  //         console.log("dataAA", data)
  //         if ( data.status === 200 )
  //           handleClick("tr", "Update User success");
  //         else
  //           handleClick("tr", "Update User fail", "error");
  // }

  render() {
    const { data } = this.state;
    return (
      <div id="user">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User Management"
                category="Manage user in your shop"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thUser.map((prop, key) => {
                          if (key !== thUser.length - 1)
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
                        data && this.renderListUser(data)
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