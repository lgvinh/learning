import React from "react";
import  {
    Grid,
    Row,
    Col,
    FormGroup,
    Table
  } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import api from "api/callApi";
import common from "common";
import { thProducerList } from "variables/Variables.jsx";
import {Link} from "react-router-dom";
// import Brand from "views/Brand/Brand";

export default class ProducerDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: {},
          listPerfume: [],
          isLoad: false, 
        }
      }

      async componentDidMount() {
          this.getData();
      }

      getData = async () => {
          const {get} = api,
          {match : {params}}= this.props,
          {removeAccents} = common;

          try {
            let data = await get("api/producer/find-id/" + params.id),
            listPerfume = await get("api/filter/perfume?producer=" + removeAccents(data.result.name, "%")),
            listProducer = await get("api/perfume/join/perfume_detail/find-producer/" + params.id);
            if (data.status === 200 && listPerfume.status === 200 && listProducer.status === 200 ){
                this.setState({
                  data: data.result, 
                  listPerfume: listPerfume.result, 
                  listProducer: listProducer.result
                });
            }
          } catch (error)
          {
            console.log("error", error);
          }
          
      }

      handleUpdateProducer = async id => {
        const { put } = api,
              { handleClick } = this.props;

        let name = document.getElementsByClassName("name")[0].value,
            address = document.getElementsByClassName("address")[0].value,
            phone = document.getElementsByClassName("phone")[0].value;

        const producer = {
            id,
            name,
            address,
            phone
        };
        try {
            this.setState({isLoad: true});
            let update = await put("api/producer/update", {...producer});
            if (update.status === 200)
            {
                this.getData();
                handleClick("tr" , "update producer success")
            }
            else {
                console.log("error");
                handleClick("tr", "update producer failed", "error");
            }
        } catch (error) 
        {
            console.log("error", error);
        }
        this.setState({isLoad: false});
      }

      renderListProducer = list => {
        console.log(list);
        const { formatVND } = common;
        return list && list.map ( item => {
          return (
            <tr 
              key={item.perfumeId}
            >
              <td>
                <Link to={`/admin/perfume/${item.id}`} className="text-primary">
                  {item.id}
                </Link>
              </td>
              <td>
                {item.name}
              </td>
              <td className="text-uppercase">
                {item.sizeId}
              </td>
              <td>
                {formatVND(item.perfumePrice)}
              </td>
            </tr>
          )
        }
    )};
    
    clickFileChange = () => document.getElementById("producer-img").click();
    
    render () {
        const {data, isLoad, listProducer,listPerfume} = this.state;
        return (
            <div className="producer-detail">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        <Card
                          title="Edit Producer"
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
                                          label: "Address",
                                          type: "textarea",
                                          bsClass: "form-control address",
                                          defaultValue: data && data.address
                                        }
                                      ]}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <FormGroup controlId="formControlsTextarea">
                                    <FormInputs
                                      ncols={["col-md-12"]}
                                      properties={[
                                        {
                                          label: "Phone",
                                          type: "textarea",
                                          bsClass: "form-control phone",
                                          defaultValue: data && data.phone
                                        }
                                      ]}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Button bsStyle="info" pullRight fill onClick={() => this.handleUpdateProducer(data.id)}>
                                Update Producer
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
                                title="Producer's perfume"
                                category="List perfume"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                  <Table striped hover>
                                    <thead>
                                      <tr>
                                        {thProducerList.map((prop, key) => {
                                          return <th key={key}>{prop}</th>;
                                        })}
                                      </tr>
                                    </thead>
                                    <tbody key = {listPerfume}>
                                      {
                                        data && this.renderListProducer(listProducer)
                                      }
                                    </tbody>
                                  </Table>
                                }
                              />
                    </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
