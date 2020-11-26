import React from 'react';
import { Link } from "react-router-dom";

import api from "../../../../api/callApi";
import common from "../../../Common";
import moment from "moment";

class OrderDetail extends React.Component {

  renderListDetail = orderDetails => {
    const { formatVND, removeAccents } = common;
    // eslint-disable-next-line
    let newArr = new Array();
    orderDetails && orderDetails.forEach( item => {
      let existedIndex = newArr.filter(i => i.name === item.name && i.size === item.size && i.id !== item.id);
      if (existedIndex.length > 0) {
        let oldArr = newArr.filter( i => i.name !== item.name || i.size !== item.size),
            updatingQuantity = {
              ...existedIndex[0],
              quantity: Number(existedIndex[0].quantity) + Number(item.quantity)
            }
        newArr= [...oldArr, updatingQuantity];
      }
      else newArr.push(item);
    });
    return newArr.map( (item, index) => {
      return (
        <tr key={item.name && removeAccents(item.name) + item.size}>
          <td className="no">{index + 1}</td>
          <td className="text-left"><h3>
              <Link to={`/detail/${item.name && removeAccents(item.name)}`}>
                {item.name}
              </Link>
              ({item.size})
            </h3>
          </td>
          <td className="unit">{item.discountedPrice && item.discountedPrice !== null ? formatVND(item.discountedPrice) : formatVND(item.price)}({item.discount}%)</td>
          <td className="qty">x{item.quantity}</td>
          <td className="total">
            {item.discountedPrice && item.discountedPrice !== null ?
              formatVND(item.discountedPrice * item.quantity)
              :
              formatVND(item.price * item.quantity)
            }
          </td>
        </tr>
      )
    });
  }

  getStatus = status => {
    let orderStatus;
    switch (status) {
      case 0:
        orderStatus = "pending"
        break;
      case 1:
        orderStatus = "confirmed"
        break;
      case 2:
        orderStatus = "canceled"
        break;
      case 3:
        orderStatus = "denied"
        break;
      default:
        break;
    }
    return orderStatus;
  }

  // eslint-disable-next-line
  isValidtoCancel = date => moment(moment(new Date)).diff(date, "hours") <= 0.5 ? true : false;

  handleCancelOrder = async id => {
    const { put } = api;
    let data = await put(`api/order/${id}`, {status: 2, message: "user canceled order"});
    if ( data.status === 200 ) {
      this.props.forceUpdate()
    } else {
      console.log("error");
    }
  }

  render() {
    const { status, closeModal, item, message, total } = this.props;
    return (
      <div className={`order-detail--modal ${status} shadow`}>
        <span className="close" onClick={() => closeModal()}>x</span>
        <div id="invoice">
          <div className="invoice overflow-auto shadow">
            <div style={{minWidth: '600px'}}>
              <header style={{padding: 20}}>
                <div className="row">
                  <div className="col" style={{display: "flex"}}>
                    <Link to="/" style={{alignSelf: "center"}}>
                      {/* eslint-disable-next-line */}
                      <img src={require("../../../../assets/img/logo.webp")} data-holder-rendered="true" />
                    </Link>
                  </div>
                  <div className="col company-details">
                    <h2 className="name">
                      {/* eslint-disable-next-line */}
                      <a href="https://github.com/lgvinh" target="_blank">
                        Ja Vince
                      </a>
                    </h2>
                    <div>(+84)0931830894</div>
                    <div>vi.vinh0312@gmail.com</div>
                  </div>
                </div>
              </header>
              <main style={{padding: 20, maxHeight: 400, overflow: "auto"}}>
                <div className="row contacts">
                  <div className="col invoice-to">
                    <div className="text-gray-light">INVOICE TO:</div>
                    <h2 className="to">{item.userFirstName + " " + item.userLastName}</h2>
                    <div className="address">Ship to: {item.address}</div>
                  </div>
                  <div className="col invoice-details">
                    <h1 className="invoice-id">INVOICE's id: <br/> {item.id}</h1>
                    <div className="date">Date of Invoice: {moment(item.createdAt).format("HH:mm:ss (DD/MM/YY)")}</div>
                  </div>
                </div>
                <div className="row contacts">
                  <div className="col invoice-to">
                    <div className="text-gray-light">Status:</div>
                    <h2 className={`to ${this.getStatus(item.status)}`}>{this.getStatus(item.status)}</h2>
                  </div>
                  <div className="col text-right">
                    <h1 className="invoice-id">Message: <br/> {message}</h1>
                  </div>
                </div>
                <table border={0} cellSpacing={0} cellPadding={0}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">DESCRIPTION</th>
                      <th className="text-right">PRICE</th>
                      <th className="text-right">Quantity</th>
                      <th className="text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderListDetail(item.orderDetails)}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} />
                      <td colSpan={2}>Shipping fee</td>
                      <td>0đ</td>
                    </tr>
                    <tr>
                      <td colSpan={2} />
                      <td colSpan={2}>TOTAL</td>
                      <td>{total}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="notices">
                  <div>NOTICE:</div>
                  <div className="notice">You can cancel order within 2 hours after purchase the order</div>
                </div>
              </main>
              <footer style={{padding: 20}}>
                Invoice was created on a computer and is valid without the signature and seal.
              </footer>
              <div className="btn--container" style={{paddingTop: 10, display: "flex", justifyContent: "flex-end"}}>
                <button className="btn btn-info">Export as PDF</button>
                {
                  item.status === 0 && this.isValidtoCancel(item.createdAt) ?
                    <button 
                      id="printInvoice"
                      className="btn btn-danger"
                      style={{marginLeft: 20}}
                      onClick={() => this.handleCancelOrder(item.id)}
                    >
                      Cancel Order
                    </button>
                  :
                    <></>
                }
              </div>
              </div>
            <div />
          </div>
        </div>
      </div>
    )
  }
}

export default class OrderHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: "hide",
      list: [],
      orderStatus: 0,
      message: "",
      total: 0
    };
  }

  async componentDidMount() {
    const { get } = api,
          { handleLoader } = this.props;

    handleLoader(true);
    try {
      let data = await get("api/filter/order");
      if ( data.status === 200 ) {
        this.setState({data: data.result});
      }
    } catch (error) {
      console.log("error", error); 
    }
    handleLoader(false);
  }

  getTotal = item => {
    const { formatVND } = common;
    let total = 0;
    item && item.orderDetails && item.orderDetails.length > 0 && item.orderDetails.forEach( data => {
      total += (Number(data.price) - Number(data.price)*Number(data.discount)/100)*Number(data.quantity);
    });
    return formatVND(total);
  }

  renderListOrder = data => {
    return (
      <ul className="order__body">
        {
          data && data.length > 0 && data.map(item => {
            const { id, address, createdAt, status, message } = item;
            let orderStatus;
            switch (status) {
              case 0:
                orderStatus = "pending"
                break;
              case 1:
                orderStatus = "confirmed"
                break;
              case 2:
                orderStatus = "canceled"
                break;
              case 3:
                orderStatus = "denied"
                break;
              default:
                break;
            }
            return(
              <li 
                key={id} 
                className="order__body--content" 
                onClick={() => this.openModal(item, status, message, this.getTotal(item))}
              >
                <ul className="body--title">
                  <li className="body--title__text id">{id}</li>
                  <li className="body--title__text address">{address}</li>
                  <li className="body--title__text total">{this.getTotal(item)}</li>
                  <li className="body--title__text date">{moment(createdAt).format("HH:mm:ss (DD/MM/YY)")}</li>
                  <li className={`body--title__text status ${orderStatus}`}>{orderStatus}</li>
                </ul>
              </li>
            );
          })
        }
      </ul>
    )
  }

  openModal(item, status, message, total) {
    this.setState({status: "show", list: item, orderStatus: status, message, total});
    document.documentElement.className = "disable";
  }

  closeModal() {
    this.setState({status: "hide", list: {}, orderStatus: 0, message: "", total: 0});
    document.documentElement.className = "";
  }

  async forceUpdate() {
    const { get } = api,
          { handleLoader } = this.props;
  
    this.setState({status: "hide", list: {}, orderStatus: 0, message: "", total: 0});
    document.documentElement.className = "";
    handleLoader(true);
    try {
      let data = await get("api/filter/order");
      if ( data.status === 200 ) {
        this.setState({data: data.result});
      }
    } catch (error) {
      console.log("error", error); 
    }
    handleLoader(false);
  }

  render() {
    const { data, status, list, orderStatus, message, total } = this.state;
    return (
      <div className="tab--content">
        <OrderDetail
          status={status}
          item={list}
          orderStatus={orderStatus}
          closeModal={this.closeModal.bind(this)}
          total={total}
          message={message}
          forceUpdate={this.forceUpdate.bind(this)}
        />
        <div className="order--container">
          <ul className="order__header">
            <li className="order__header--text id">ID</li>
            <li className="order__header--text address">Ship to</li>
            <li className="order__header--text total">Total</li>
            <li className="order__header--text date">Date</li>
            <li className="order__header--text status">Status</li>
          </ul>
          {this.renderListOrder(data)}
        </div>
      </div>
    );
  }
}