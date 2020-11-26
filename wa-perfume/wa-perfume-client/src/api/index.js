import axios from "axios";

/**
 * 
 * Cần lao vi tiên thủ
 * Năng cán dĩ đắc thực 
 * Vô vi thực đầu buồi
 * Thực cứt thế cho nhanh
 * Tác giả: Huấn Hoa Tử
 * 
 */

const addHeader = (method, options) => {
  let token = localStorage.getItem("token"),
      Authorization = token && token !== "" && token.length > 0 ? token : "";
  return axios({
    headers: {
      Authorization,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    method,
    url: options.url,
    data: {
      ...options.payload
    },
    // timeout: 10000,
    // timeoutErrorMessage: "Request time out",
  })
}

const sendApiWithOutPayload = method => url => {
  return new Promise((resolve, reject) => {
    addHeader(method, {url})
    .then(response => {
      if ( response.status === 200 )
        resolve(response.data);
      else
        resolve({message: "error"});
    })
    .catch(err => reject(err))
  });
}

const sendApiWithPayload = method => (url, payload) => {
  return new Promise((resolve, reject) => {
    addHeader(method, {url, payload})
    .then(response => {
      if ( response.status === 200 ) {
        resolve(response.data);
      } else reject({message: "errorr"});
    })
    .catch(err => reject(err));
  });
}

export default {
  get: sendApiWithOutPayload("get"),
  delete: sendApiWithOutPayload("delete"),
  post: sendApiWithPayload("post"),
  put: sendApiWithPayload("put"),
  patch: sendApiWithOutPayload("patch")
}