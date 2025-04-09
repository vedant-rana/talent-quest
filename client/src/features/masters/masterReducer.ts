import { combineReducers } from "@reduxjs/toolkit";
import logoReducer from "../masters/logos/logoSlice";

const masterReducer = combineReducers({
  logo: logoReducer,
});

export default masterReducer;
