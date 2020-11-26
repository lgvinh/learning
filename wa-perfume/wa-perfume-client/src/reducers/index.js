import { combineReducers } from "redux";
import cart from "./cart";
import isSignin from "./signin"; 

const allReducer = combineReducers({
  cart,
  isSignin
});

export default allReducer; 