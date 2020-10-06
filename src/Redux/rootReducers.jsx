import { combineReducers } from "redux";
import authReducer from "./Reducers/Auth";

const RootReducer = combineReducers({
  auth: authReducer,
});

export default RootReducer;
