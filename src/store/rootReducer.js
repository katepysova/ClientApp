import { combineReducers } from "redux";
import dateReducer from "@store/date/dateReducer.js";

const rootReducer = combineReducers({
  date: dateReducer
});

export default rootReducer;
