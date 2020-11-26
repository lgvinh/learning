import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import Card from "components/Card/Card.jsx";
import { thOrderDetail } from "variables/Variables.jsx";
import api from "api/callApi";
import common from "common";
import moment from "moment";

export default class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    const { get } = api, 
          { match: { params } } = this.props;
    try {
      let data = await get(`api/filter/order?id=${params.id}`);
      if ( data.status === 200 ) {
        this.setState({data: data.result && data.result[0]});
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleUpdateStatus = async (id, status) => {
    const { put, get } = api,
          { match: { params } } = this.props;
    let data,
        message = document.getElementsByClassName("form-control")[0];
    let payload = {
      status: status === "approve" ? 1 : 3
    };
    if ( message.value.length > 0 ) payload.message = message.value;
    data = await put(`api/order/${id}`, payload);
    if ( data.status !== 200 )
      console.log("error", data);
    else {
      try {
        let newData = await get(`api/filter/order?id=${params.id}`);
        if ( newData.status === 200 ) {
          this.setState({data: newData.result[0]});
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    this.forceUpdate();
    window.scroll({top: 0, behavior: "smooth"});
  }

  // eslint-disable-next-line
  isValidtoCancel = date => moment(moment(new Date)).diff(date, "hours") <= 0.5 ? true : false;

  renderListDetail = detail => {
    const { formatVND } = common;
    return detail && detail.orderDetails && detail.orderDetails.length > 0 && detail.orderDetails.map( item => {
      let status = "canceled";
      switch (item.status) {
        case 1:
          status = "confirmed"
          break;
        default:
          break;
      }
      return (
        <tr key={item.id} title={item.id}>
          <td>
            <img style={{width: 70, height: 70}} src={item.image} alt={item.name}/>
            <strong style={{paddingLeft: 20}}>{item.name}</strong>
          </td>
          <td>
            <u>{item.size}</u>
          </td>
          <td>x{item.quantity}</td>
          <td>
            {
              item.discountedPrice ?
                <>
                  {formatVND(item.discountedPrice)}(<del>{formatVND(item.price)}</del>)
                </>
              :
                formatVND(item.price)
            }
          </td>
          <td>
            <Link to={`/admin/producer/${item.producerId}`}>
              {item.producerName}
            </Link>
          </td>
          <td className={`text-uppercase ${item.status ? "text-success" : "text-danger"}`} style={{fontWeight: "bold"}}>
            {status}
          </td>
        </tr>
      );
    });
  };

  render() {
    const { data } = this.state;
    let newStatus = {
      status: "pending",
      className: "info"
    };
    if (data && data.status)
      switch (data.status) {
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
      <div id="order-detail">
        <Link
          style={{margin: 20}}
          to={"/admin/order"}
        >
          Back
        </Link>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={`${data && data.userFirstName ? data.userFirstName +"'s order" : "Order" }`}
                category={`Created at: ${data && moment(data.createdAt).format("HH:mm:ss (DD/MM/YYYY)")}`}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Row>
                      <Col md={6}>
                        <p style={{paddingLeft: 15}}><b className= {`text-uppercase`}>Receiver's name: </b>{data && data.receiverName}</p>
                      </Col>
                      <Col md={6}>
                        <p style={{paddingLeft: 15}}><b className={`text-uppercase`}>Receiver's phone: </b>{data && data.phone}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <p style={{paddingLeft: 15}}><b className={`text-uppercase`}>Receiver's address: </b>{data && data.address}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <p style={{paddingLeft: 15}}><b className={`text-uppercase`}>Message: </b>{data && data.message}</p>
                      </Col>
                      <Col md={6}>
                        <p style={{paddingLeft: 15}}><b>Status: </b><span className={`text-${newStatus && newStatus.className} text-uppercase`} style={{fontWeight: "bold"}}>{newStatus && newStatus.status}</span></p>
                      </Col>
                    </Row>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thOrderDetail.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {data && this.renderListDetail(data)}
                      </tbody>
                    </Table>
                  </>
                }
              />
              {
                data.status === 0 ?
                  <>
                    {
                      !this.isValidtoCancel(data.createdAt) ?
                      <>
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Note",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Write a note for client"
                            }
                          ]}
                        />
                        <div className="row" style={{display: "flex", justifyContent: "center"}}>
                          <button 
                            className="bg-primary btn-lg"
                            onClick={() => this.handleUpdateStatus(data.id, "approve")}  
                          >
                            Approve
                          </button>
                          <button 
                            className="bg-danger btn-lg" 
                            style={{marginLeft: 20}}
                            onClick={() => this.handleUpdateStatus(data.id, "denied")}
                          >
                            Denied
                          </button>
                        </div>
                      </>
                      :
                      <p className="text-primary text-uppercase text-center" style={{fontSize: 30}}>Wait for 30 minute to proceed</p>
                    }
                  </>
                :
                  <></>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}