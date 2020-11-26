// Regexp
// eslint-disable-next-line
let emailVal = (/^[a-z((\w|\.)?)A-Z0-9]{4,}(\@)[a-z]+((\.[a-z]{2,})+)$/),
    passVal = (/^[a-zA-Z0-9]{6,}$/),
    phoneVal = (/^0[0-9]{9,11}$/);

const formatVND = (text, groupSeparate = '.', currency = 'đ') => {
  text += "";
  text = text.replace(/\D/gm, '');
  if ( text[0] === '0' && text.length > 0 ) {
    text =  text.replace( text[0], '' );
  }
  if (text.length >= 4) {
    for ( var i = text.length - 3; i >=1 ; i -= 3 ) {
      text =  text.replace( text, text.substr(0, i) + groupSeparate + text.substr(i, text.length) );
    }
  }
  return text.length > 0 ? text + currency : "0" + currency;
}

function removeAccents(str, groupSeparate = "-") {
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
  return str.replace(/\s/g, groupSeparate);
}

const inputAnimation = () => {
  var test = document.querySelectorAll(".c-input-eff");
  if ( test ) {
    test.forEach(function(item) {
      item.children[0].addEventListener("change", function() {
        let child = item.children;
        if(child[0].value !== "") {
          child[1].style.cssText = "top: -1px; color: #ee2d7a; font-size: 15px; font-weight: 700px";
        } else {
          child[1].style.cssText = "";
        }
      });
    });
  }
}

const validation = obj => {
  const arr = Object.entries(obj);
  let message = "Invalid";
  arr.forEach( item => {
    switch (item[0]) {
      case "email":
        if ( !emailVal.test(item[1].value) ) 
          message += message.length > 7 ? " or mail address" : " mail address";
        break;
      case "pass":
      case "password":
        if ( !passVal.test(item[1].value) )
          message += message.length > 7 ? " or password" : " password";
        break;
      case "phone":
        if ( !phoneVal.test(item[1].value) )
          message += message.length > 7 ? " or phone number" : " phone number";
        break;
      default:
        break;
    }
  });
  return message.length > 7 ?  message : "";
}

const getBase64 = file => {
  return new Promise( (resovle, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resovle(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  formatVND,
  validation,
  inputAnimation,
  removeAccents,
  getBase64
}