import { combineReducers } from "redux";
import dateReducer from "@store/date/dateReducer.js";
import userReducer from "@store/user/userReducer.js";

const rootReducer = combineReducers({
  date: dateReducer,
  user: userReducer
});

export default rootReducer;
