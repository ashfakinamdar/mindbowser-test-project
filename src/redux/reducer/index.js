import { combineReducers } from "redux";
import { schoolReducer } from "./schoolReducer";

const reducers = combineReducers({
  allSchools: schoolReducer,
});

export default reducers;
