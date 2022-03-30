import user from "./user/reducer";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  user,
});

export default reducer;
