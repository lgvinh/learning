import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import moment from "moment";
import { thSizeOfPerfume } from "variables/Variables.jsx";

import api from "api/callApi";
import common from "common";

export default class PerfumeDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sizes: [],
      brands: [],
      gender: 0,
      status: 0,
      brand: 0,
      processing: false
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { match: { params } } = this.props,
          { get } = api;
    let data = await get("api/perfume_detail/join/brand/find-id/" + params.id),
        dataSize = await get("api/filter/perfume?id=" + params.id),
        brand = await get("api/brand/all");
        console.log("datasize", dataSize)
    try {
      if ( data && data.status === 200 && brand.status === 200 ) {
        this.setState({data: data.result, brands: brand.result, gender: data.result.gender, status: data.result.status, brand: data.result.brandId});
        if ( dataSize.result.length > 0 ) {
          this.setState({sizes: dataSize.result[0].sizes});
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderBrand = brands => {
    return brands && brands.map( item => <option multiple={false}
      key={item.id} value={item.id}>{item.name}</option> );
  }

  renderSize = sizes => {
    const { match : { params: {id}}} = this.props,
          { formatVND } = common;
    console.log("sizes", sizes)
    return sizes.map( item => {
      return item.producers.map( list => {
        return (
          <tr 
            key={list.perfumeId}
          >
            <td>
              <Link to={`/admin/perfume/${id}/${list.perfumeId}`}>
                {list.perfumeId}
              </Link>
            </td>
            <td>
              {item.size}
            </td>
            <td>
              {formatVND(item.price)}
            </td>
            <td>
              {list.quantity}
            </td>
            <td>
              {item.discount}%
            </td>
            <td>
              <Link to={`/admin/producer/${list.producerId}`}>
                {list.producerName}
              </Link>
            </td>
          </tr>
        )
      });
    });
  }

  handleUpdatePerfume = async () => {
    const { gender, brand, status} = this.state,
          { getBase64 } = common,
          { match: {params}, handleClick } = this.props,
          { put } = api;
    let name = document.getElementById("name"),
        comeFrom = document.getElementById("come-from"),
        lastLong = document.getElementById("last-long"),
        musk = document.getElementById("musk"),
        releasedAt = document.getElementById("released-at"),
        style = document.getElementById("style"),
        description = document.getElementById("description"),
        image = document.getElementById("add-perfume-image");
    const perfume = {
      id: params.id,
      name: name.value,
      comeFrom: comeFrom.value,
      lastLong: lastLong.value,
      musk: musk.value,
      releasedAt: moment(releasedAt.value).toISOString(),
      style: style.value,
      description: description.value,
      gender,
      brandId: brand,
      status
    }
    if ( image && image.files[0] ) {
      let base64 = await getBase64(image.files[0]);
      perfume["image"] = base64;
    }
    try {
      this.setState({processing: true});
      let data = await put("api/perfume_detail/update", perfume);
      if ( data.status === 200 ) {
        handleClick("tr", "Update perfume success");
        this.getData();
      } else handleClick("tr", "Update producer failed", "error");
    } catch (error) {
      console.log(error);
    }
    this.setState({processing: false});
    image.value = "";
    document.getElementById("preview-name").innerHTML = "";
  }

  render() {
    const { data, sizes, brands, gender, status, brand, processing } = this.state,
          { formatVND } = common,
          { history, match: { params } } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Perfume"
                content={
                  <form>
                    <Row>
                      <Col sm={8}>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "ID",
                              type: "text",
                              bsClass: "form-control",
                              defaultValue: data && data.id,
                              disabled: true
                            },
                            {
                              label: "Name",
                              type: "text",
                              bsClass: "form-control",
                              defaultValue: data && data.name,
                              id: "name"
                            }
                          ]}
                        />
                      </Col>
                      <Col sm={4} style={{paddingTop: 12}}>
                        <FormGroup>
                            <ControlLabel>Gender</ControlLabel>
                            <FormControl
                              rows="5"
                              componentClass="select"
                              bsClass="form-control"
                              id="gender"
                              value={gender}
                              onChange={ e => this.setState({gender: e.currentTarget.value})}
                            >
                              <option value={0}>Female</option>
                              <option value={1}>Male</option>
                              <option value={2}>Unisex</option>
                            </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "valuation",
                              type: "text",
                              bsClass: "form-control",
                              defaultValue: data && data.price && formatVND(data.price),
                              id: "price",
                              disabled: true
                            },
                            {
                              label: "Come from",
                              type: "text",
                              bsClass: "form-control",
                              defaultValue: data && data.comeFrom,
                              id: "come-from"
                            }
                          ]}
                        />
                      </Col>
                      <Col sm={4} style={{paddingTop: 12}}>
                        <FormGroup>
                          <ControlLabel>Status</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="select"
                            bsClass="form-control"
                            id="status"
                            value={status}
                            onChange={ e => this.setState({status: e.currentTarget.value})}
                          >
                            <option value={0}>Close</option>
                            <option value={1}>Open</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Last long",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: data && data.lastLong,
                          id: "last-long"
                        },
                        {
                          label: "Musk",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: data && data.musk,
                          id: "musk"
                        },
                        {
                          label: "Released At",
                          type: "date",
                          bsClass: "form-control",
                          defaultValue: data && data.releasedAt && moment(data.releasedAt).format("YYYY-MM-DD"),
                          id: "released-at"
                        }
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={8}>
                            <FormInputs
                              ncols={["col-md-12"]}
                              properties={[
                                {
                                  label: "Style",
                                  type: "text",
                                  bsClass: "form-control",
                                  defaultValue: data && data.style,
                                  id: "style"
                                }
                              ]}
                            />
                          </Col>
                          <Col md={4} style={{paddingTop: 12}}>
                            <FormGroup>
                              <ControlLabel>Brand</ControlLabel>
                              <FormControl
                                rows="5"
                                componentClass="select"
                                bsClass="form-control"
                                id="brand"
                                value={brand}
                                onChange={ e => this.setState({brand: e.currentTarget.value})}
                              >
                                {this.renderBrand(brands)}
                              </FormControl>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="description">
                          <ControlLabel>Description</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            defaultValue={[data.description]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {
                      processing ?
                      <p className="text-info text-uppercase">processing</p>
                      :
                      <></>
                    }
                    <Button bsStyle="danger" pullRight fill style={{marginLeft: 20}}>
                      <Link to="/admin/perfume" style={{color: "white"}}>
                        Cancel
                      </Link>
                    </Button>
                    <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdatePerfume()}>
                      Update Perfume
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4} style={{boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1)", backgroundColor: "white"}}>
              <div className="clearfix" />
              <input 
                accept="image/x-png,image/gif,image/jpeg" 
                type="file" 
                id="add-perfume-image" 
                style={{display: "none"}}
                onChange={e => {
                  if (e.currentTarget.files[0])
                    document.getElementById("preview-name").innerHTML = e.currentTarget.files[0].name;
                }}
              />
              <div className="image" style={{minWidth: 300, minHeight: 300}}>
                <img style={{height: "100%"}} src={data.image} alt="" className="perfume-image"/>
              </div>
              <Button 
                simple 
                onClick={() => document.getElementById("add-perfume-image").click()}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                }}  
              >
                Change perfume's image
              </Button>
              <p id="preview-name" style={{wordBreak: "break-all"}}></p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Perfume's size"
                category="List size"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thSizeOfPerfume.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          sizes && this.renderSize(sizes)
                        }
                      </tbody>
                    </Table>
                    <Button 
                      bsStyle="success" 
                      pullRight fill 
                      style={{marginRight: 20}}
                      onClick={() => history.push(`/admin/perfume/${params.id}/add-size`)}
                    >
                      Add sizes
                    </Button>
                    <div className="clearfix" />
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}