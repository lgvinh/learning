import React from 'react';
import MetaData from "../../../MetaData";


import Loader from "../../Loader/LoadingModal";
import PreviewModal from "../../Modal/PreviewModal";
import ChooseSizeModal from "../../Modal/ChooseSizeModal";
import Product from "../../Product";
import { ReactComponent as Perfume } from "../../../../assets/SVG/perfume.svg";


import api from "../../../../api/callApi";


export default class AllProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checked: false,
      tabContent: "nhãn A",
      preview: {
        isPreviewing: false
      },
      data: [],
      dataBrand: [],
      dataE: [],
      dataSize: [],
      dataS: [],
      dataEachSize: [],
      sizeCondition:[]
    }
    this.tabItem = []
  }
  sizeCondition = (size) =>{
    if(size !== this.state.sizeCondition){
      this.state.sizeCondition.push(size);
      this.setState ({sizeCondition:this.state.sizeCondition});
    }
    console.log("sizeCondition", this.state.sizeCondition)
  } 
   renderListNewProduct = (data) => {
    return data && data.length > 0 && data.map( (item, index) => {
      return (
        <Product
          key={item.id}
          {...item}
          preview={this.preview}
          addFunc={this.handleAddFunc.bind(this)}
          duration={(index+1)*100}
        />
      )
    });
  }
  preview = ( data ) => {
    this.setState({
      preview: {
        isPreviewing: true,
        ...data
      }
    });
  }

  previewOff = () => {
    this.setState({
      preview: {
        isPreviewing: false
      },
    });
  }
  async componentDidMount() {
    const { reset, history } = this.props;
    let data;
    let dataBrand;
    let dataSize;
    // common.inputAnimation;
    reset();
    try {
      data = await api.getAllProduct();
      dataBrand = await api.getAllBranch();
      dataSize = await api.getSize();
      // console.log("test",dataBrand)
      //dataEach = await api.getBranch();
    } catch (error) {
      console.log(error);
      history.push("/404");
    }
    this.setState({isLoading: false, data: data && data.result ? data.result : null, 
      dataBrand: dataBrand && dataBrand.result ? dataBrand.result : null,
      dataSize: dataSize && dataSize.result ? dataSize.result : null,
    });
    var flag = false;
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 500);
    this.setState({haveChange: flag});
  }

  handleAddFunc = (product) => {
    this.setState({isLoading: true});
    this.props.addToCartAction(product);
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 200);
  }

  renderListBranch = (dataBrand) =>
  {
    return dataBrand && dataBrand.length > 0 && dataBrand.map( (item, index) => {
        return (
            <div key={item.id} >
              {item.name}</div>
        )
      });
  }
//   renderEachBrand = async (brandName) =>
//   {
//     console.log('brandName',brandName)
//     let dataE, dataS;
//     try{
//       dataE = await api.getBranch(this.removeAccents(brandName.name));
//       // dataS = await api.getEachSize(brandName)
//       // console.log("dataS",dataS.result[1].sizes);
//       console.log("dataE",dataE);
//     } catch (error) {
//       console.log(error);
//     }
//     this.setState ({dataE: dataE && dataE.result ? dataE.result : null, data: null, dataS: null})
//     // console.log("State: ",this.state.dataE);
//   }
  renderListSize = (dataSize) => {
    // console.log("dataSize",dataSize)
    return dataSize && dataSize.length > 0 && dataSize.map ((item, index) => {
      return (
      <div key={index}>{item.sizeId}</div>
      )
    })
  }

  removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }  
  
  renderEachSize = async (size) =>
  {
    console.log('size',size)
    let dataS;
    try{
      dataS = await api.getEachSize(size);
    //   console.log("dataSSSSSSS",dataS);
    } catch (error) {
      console.log(error);
    }
    this.setState ({dataS: dataS && dataS.result ? dataS.result : null, data: null, dataE: null})
  }
  renderEachBrandandSize = async (sizeandbrand) =>
  {
    let dataEachSizes
    try{
       // dataEachSize = await api.getBrandandSize(this.removeAccents(sizeandbrand.name));
       console.log('SizeBrand: ', sizeandbrand);
        dataEachSizes = await api.getBrandandSize();
      } catch (error) {
        console.log(error);
      }
      this.setState ({
        dataEachSizes: dataEachSizes && dataEachSizes.result ? dataEachSizes.result : null, data: null})
  }
  getAllProduct = async () => {
    let get = [];
    let result = [];
    let sizes = this.state.sizeCondition;
    try {
      get = await api.getAllProduct();
      console.log("before filter", get)
      get.result.forEach(
        product => {
          let flag = false;
            product.sizes.forEach(
              size => {
                if(!flag) {
                  for (let i = 0; i< sizes.length; i++) {
                    if (size.size === sizes[i]) {
                      result.push({...product});
                      flag = true;
                      break;
                    }
                  }
                }
                
              }
            );
         
        }
      );
      this.setState({dataEachSize:result, data: null})
      console.log("after filter",result)
    } catch (error)
    {
      console.log(error);
    }
    
  }
  sectionDeviner = (
    <div className="section-diviner">
      <div>
        <Perfume />
      </div>
    </div>
  )
  render() {
    const { isLoading, preview, data, dataBrand, dataSize,dataEachSize,dataEachSizes } = this.state;
    return (
      <div id="home">
        <MetaData
          title = "W.A Perfume Shop | Home"
          description="Home page"
          ogTitle="W.A Perfume Shop | Home"
          // ogI
        />
        <PreviewModal
          {...preview}
          previewOff={this.previewOff}
          addFunc={this.handleAddFunc}
        />
        <ChooseSizeModal

        />
        <Loader isLoad={isLoading} />
        <header>
        <div className="header-content-left">
          <ul>
            {dataBrand && dataBrand.length > 0 && dataBrand.map((item, index) => 
            { return (
            <li key = {index}
              type="submit"  
              className="update--btn"
              onClick={() => this.renderEachBrandandSize(dataBrand[index])}
             >
              <div action =""
              key={index}
              ><input type="radio" name="brand"/>{this.renderListBranch(dataBrand)[index]}</div>
            </li>)})
            }
            </ul>
            <div className="header-content-left">
            {dataBrand && dataBrand.length > 0 && dataBrand.map((item, index) => 
            { return (
            <li key = {index}
              type="submit"  
              className="update--btn"
              onClick={() => this.sizeCondition(dataSize[index].sizeId)}
             >
              <div action ="" key={index}>
                <input type="radio"/>{this.renderListSize(dataSize)[index]}</div>
            </li>)})
            }
            </div>
            <button onClick = {() => this.getAllProduct()}>search</button>
        </div>
        </header>
        <div className="main-content">
          <section id="section-one" className="new-product container-wrapper product-wrapper" data-aos="zoom-out-left">
            <h3>
              Products
              <p>
                Looking for product?
                <span>Try these</span>
              </p>
            </h3>
            {this.sectionDeviner}
            <div className="new-product-content">
              {this.renderListNewProduct(data)}
            </div>

            <div className="new-product-content">
              {
                dataEachSize && dataEachSize.length > 0 ?
                dataEachSize.map((item, index) => {
                return (
                  <Product
                  key={item.id}
                  {...item}
                  preview={this.preview}
                  addFunc={this.handleAddFunc.bind(this)}
                  duration={(index+1)*100}
                />
                )
              })
              : ""
              }
            </div> 
            <div className="new-product-content">
              {
                dataEachSizes && dataEachSizes.length > 0 ?
                dataEachSizes.map((item, index) => {
                return (
                  <Product
                  key={index}
                  {...item}
                  preview={this.preview}
                  addFunc={this.handleAddFunc.bind(this)}
                  duration={(index+1)*100}
                />
                )
              })
              : ""
              }
            </div>
          </section>
        </div>
      </div>
    );
  }
}