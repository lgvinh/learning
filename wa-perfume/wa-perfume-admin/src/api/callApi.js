import api from "./index";
const { get, post, put, delete: deleteApi } = api;
const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://wa-perfume-shop-api.herokuapp.com";

export default  {
  get(url) {
    return get(`${baseURL}/${url}`);
  },

  post(url, data) {
    return post(`${baseURL}/${url}`, data);
  },

  put(url, data) {
    return put(`${baseURL}/${url}`, data);
  },

  delete(url) {
    return deleteApi(`${baseURL}/${url}`);
  }
}