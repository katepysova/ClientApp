import { createStore } from "redux";
import rootReducer from "@store/rootReducer.js";

const store = createStore(rootReducer);
export default store;
