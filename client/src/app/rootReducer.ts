import { combineReducers } from "@reduxjs/toolkit";
import masterReducer from "../features/masters/masterReducer";
import userReducer from "../features/users/userSlice";

const rootReducer = combineReducers({
  // master: masterReducer,
  user: userReducer,
});

export default rootReducer;
