import { combineReducers } from "redux";
import signinReducer from "./signin";

const allReducer = combineReducers({
  signinReducer
});

export default allReducer;