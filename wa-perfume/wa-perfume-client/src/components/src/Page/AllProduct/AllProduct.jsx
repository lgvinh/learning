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
      dataSize: [],
      dataEachSizesandBrand: [],
      // dataAll: [],
      name : []
    }
    this.tabItem = []
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
  
  sectionDeviner = (
    <div className="section-diviner">
      <div>
        <Perfume />
      </div>
    </div>
  )
  renderEachBrandandSize = async (sizeandbrand) =>
  {
    let dataEachSB;
    let brandName =""
    , sizeName = "";
    let brand = document.getElementsByClassName("brand");
    let size = document.getElementsByClassName("sizeCheckBox");
    if(brand && size)
    {
      for(let i of brand)
      {
        if(i.checked)
        {
          brandName = i.value
        }
      }
      for(let j of size)
      {
        if(j.checked)
        {
          sizeName += sizeName.length > 0 ? ","+j.value : j.value
        }
      }
    }
    console.log("brandName", brandName)
    console.log("sizeName", sizeName)
    try{
      dataEachSB = await api.getBrandandSize(brandName , sizeName );
        console.log("aaa",dataEachSB)
      } catch (error) {
        console.log(error);
      }
      this.setState ({
        dataEachSizesandBrand: dataEachSB && dataEachSB.result ? dataEachSB.result : null, data: null, name: null})
  }
  // renderAllProduct = async () => {
  //   let dataAll;
  //   try {
  //     dataAll = await api.getAllProduct();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log("dataAll",dataAll)
  //   this.setState({dataAll : dataAll && dataAll.result ? dataAll.result: null,dataEachSizesandBrand:null , data: null , name: null})
  // }
  search = async () => {
    let name;
    let brandName = "";
    let size = "";
    let key = "";
    let keyword = document.getElementsByClassName("search");
    if(keyword)
    {
      for(let i of keyword)
      {
        key = i.value
      }
    }
    console.log("key" , key)
    try {
      name = await api.getBrandandSize(brandName,size,this.removeAccents(key))
      console.log('name',name)
    } catch(error)
    { 
      console.log(error);
    }
    this.setState({name : name && name.result ? name.result: null,dataEachSizesandBrand:null , data: null })
  }
  render() {
    const { isLoading, preview, data,dataAll, dataBrand,dataEachSizesandBrand, dataSize,name } = this.state;
    console.log("dataAll", dataAll)
    console.log("dataEachSizes", dataEachSizesandBrand)
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
        <div>
        <div className="header-content fixed-header-content">
          <div className="header-content-left">
            <ul>
              <li style={{padding: 30, fontSize: 20}}>
                Brands
                <ul className="sub-menu fix-sub-menu">
                  <p>
                    {
                      dataBrand && dataBrand.length > 0 && dataBrand.map((item, index) => { 
                        return (
                          <li key = {index}
                            type="submit"  
                            className="update--btn"
                          >
                            <div action =""
                            key={index}
                            ><input type="checkbox" name="brand" className="brand" value={item.name}/>{item.name}</div>
                          </li>
                        )
                      })
                    }
                  </p>
                </ul>
              </li>
            </ul>
          </div>
            <div className="header-content-left">
              <ul>
                <li style={{padding: 30, fontSize: 20}}>
                  Size
                  <ul className="sub-menu fix-sub-menu">
                    <p>
                      {
                        dataSize && dataSize.length > 0 && dataSize.map((item, index) => { 
                          return (
                            <li key = {index}
                              type="submit"  
                              className="update--btn"
                            >
                              <div action ="" key={index}>
                            <input type="checkbox" className="sizeCheckBox"value={item.sizeId}/>{item.sizeId}
                            </div>
                            </li>
                          )
                        })
                      }
                    </p>
                  </ul>
                </li>
              </ul>
            <button onClick={()=> this.renderEachBrandandSize()}>Search Brand and Size</button>
            {/* <p onClick={ ()=> this.renderAllProduct()}>All Product</p> */}
            <button onClick={()=>this.search()}>Search</button><input type="text" className="search" />
            </div>
            
        </div>
        </div>
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
                dataEachSizesandBrand && dataEachSizesandBrand.length > 0 ?
                dataEachSizesandBrand.map((item, index) => {
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
                dataAll && dataAll.length > 0 ?
                dataAll.map((item, index) => {
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
                name && name.length > 0 ?
                name.map((item, index) => {
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
          </section>
        </div>
      </div>
    );
  }
}