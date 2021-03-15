import { combineReducers } from "redux";
import user from "./user";
import serviceRequest from "./serviceRequest";

const appReducer = combineReducers({
  user,
  serviceRequest
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
