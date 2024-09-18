import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer/index.js";

const rootReducer = combineReducers({
  exampleReducer,
});

export default rootReducer;
