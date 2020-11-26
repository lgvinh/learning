import React from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  Table
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
import common from "common";
import { thPerfume } from "variables/Variables.jsx";

export default class BrandDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listPerfume: [],
      isLoad: false
    }
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { get } = api,
          { match : { params } } = this.props;
    try {
      let data = await get("api/brand/find-id/" + params.id),
          listPerfume = await get("api/perfume_detail/find-id-branch/" + data.result.id)
      if ( data.status === 200 || listPerfume.status === 200) {
        this.setState({data: data.result, listPerfume: listPerfume.result});
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  handleUpdateBrand = async id => {
    const { put } = api,
          { handleClick } = this.props,
          { getBase64 } = common;
    let description = document.getElementsByClassName("description")[1].value,
        name = document.getElementsByClassName("name")[0].value,
        image = document.getElementById("brand-img");

    const brand = {
      id,
      name,
      description
    };
    if ( image.files && image.files[0] ) {
      let base64 = await getBase64(image.files[0]);
      brand["image"] = base64;
    }
    try {
      this.setState({isLoad: true});
      let update = await put("api/brand/update", {...brand});
      if ( update.status === 200 ) {
        this.getData();
        handleClick("tr", "update brand success");
      }
      else {
        console.log("error");
        handleClick("tr", "update brand failed", "error");
      }
    } catch (error) {
      console.log("error", error);
    }
    this.setState({isLoad: false});
    image.value = "";
    document.getElementById("preview-name").innerHTML = "";
  }

  renderListPerfume = list => {
    return list && list.map( item => {
      let gender, status;
      switch (item.gender) {
        case 0:
          gender="female";
          break;
        case 1:
          gender="male";
          break;
        case 2:
          gender="unisex";
          break;
        default:
          break;
      }
      switch (item.status) {
        case 0:
          status="closed";
          break;
        case 1:
          status="open";
          break;
        default:
          break;
      }
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
          <td className="text-uppercase">
            {gender}
          </td>
          <td className="text-uppercase">
            {status}
          </td>
        </tr>
      )
    });
  }

  clickFileChange = () => document.getElementById("brand-img").click();

  render() {
    const { data, listPerfume, isLoad } = this.state;
    return (
      <div className="brand-detail">
        <input 
          type="file" 
          accept="image/x-png,image/gif,image/jpeg" 
          id="brand-img" 
          style={{display: "none"}}
          onChange={ e => document.getElementById("preview-name").innerHTML = e.currentTarget.files[0] && e.currentTarget.files[0].name}
        />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <UserCard
                bgImage={data.image}
                avatar={data.image}
                socials={
                  <div>
                    <Button simple onClick={() => this.clickFileChange()}>
                      Change brand's image
                    </Button>
                    <p id="preview-name" style={{wordBreak: "break-all"}}>

                    </p>
                  </div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                title="Edit Brand"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-7", "col-md-5"]}
                      properties={[
                        {
                          label: "id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: data && data.id,
                          disabled: true
                        },
                        {
                          label: "Name",
                          type: "text",
                          bsClass: "form-control name",
                          defaultValue: data && data.name
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "Description",
                                type: "textarea",
                                bsClass: "form-control description",
                                defaultValue: data && data.description
                              }
                            ]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdateBrand(data.id)}>
                      Update Brand
                    </Button>
                    <div className="clearfix" />
                    {
                      isLoad ? 
                      <p className="text-info text-uppercase">Processing</p>
                      :
                      <></>
                    }
                  </form>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Brand's perfume"
                category="List perfume"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thPerfume.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && this.renderListPerfume(listPerfume)
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