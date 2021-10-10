import { combineReducers } from "redux";
import { schoolReducer } from "./schoolReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  allSchools: schoolReducer,
  createUser: userReducer,
});

export default reducers;
