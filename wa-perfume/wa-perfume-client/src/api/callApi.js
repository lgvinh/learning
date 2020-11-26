import api from "./index";
const { get, post, put } = api;
const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://wa-perfume-shop-api.herokuapp.com";

export default  {
  
  getAllPerfume() {
    return get(`${baseURL}/api/perfume/all`);
  },

  getSinglePerfume(id) {
    return get(`${baseURL}/api/perfume/single/${id}`);
  },

  getPaginationPerfume(data = {}) {
    return get(`${baseURL}/api/perfume?skip=${data.skip ? data.skip : 0}&limit=${data.limit ? data.limit : 10}`);
  },

  signin(data, role = "user") {
    return post(`${baseURL}/signin/${role}`, data);
  },

  getPerfume(limit = 20, skip = 0, keyword = "") {
    return get(`${baseURL}/api/filter/perfume?limit=${limit}&skip=${skip}&keyword=${String(keyword).replace(" ", "%").trim()}`);
  },

  get(url) {
    return get(`${baseURL}/${url}`);
  },

  post(url, data) {
    return post(`${baseURL}/${url}`, data);
  },

  forgetPass(data) {
    return post(`${baseURL}/api/user/forget-password`, data);
  },

  verifyPass(data)
  {
    return put(`${baseURL}/verify/forget-password`, data);
  },

  changePass(data) {
    return put(`${baseURL}/api/user/update-password`, data);
  },
  
  updateProfile(data){
    return put(`${baseURL}/api/user/update`, data);
  },

  put(url, data = {}) {
    return put(`${baseURL}/${url}`, data);
  },

  getPagination(url, data = {}) {
    return get(`${baseURL}/${url}?skip=${data.skip ? data.skip : 0}&limit=${data.limit ? data.limit : 10}`);
  },

  getAllProduct (limit = 200, skip = 0, keyword = ""){
    return get(`${baseURL}/api/filter/perfume?limit=${limit}&skip=${skip}&keyword=${String(keyword).replace(" ", "%").trim()}`);
  },

  getAllBranch () {
    return get(`${baseURL}/api/brand/all`)
  },
  getBranch (name="",limit = 200, skip = 0, keyword = "") {
    console.log("API BRNAME: ", name);
    return get(`${baseURL}/api/filter/perfume?brand=${name}&limit=${limit}&skip=${skip}&keyword=${String(keyword).replace(" ", "%").trim()}`)
  },
  getSize ()
  {
    return get(`${baseURL}/api/brand/find-size`)
  },
  // Search (name="",limit = 10, skip = 0, keyword = "") {
  //   return get(`${baseURL}/api/filter/perfume?brand=${name}&limit=${limit}&skip=${skip}&keyword=${String(keyword).replace(" ", "%").trim()}`)
  // },
  getBrandandSize (name="",size="", keyword = "",limit = 200, skip = 0)
  {
    let keywordFormat = keyword;
    for(let i=0;i<keywordFormat.length; i++) keywordFormat = String(keywordFormat).replace(' ','%').trim();
    console.log('alo',keywordFormat)
    return get(`${baseURL}/api/filter/perfume?brand=${name}&size=${size}&limit=${limit}&skip=${skip}&keyword=${keywordFormat}`)
  },
}