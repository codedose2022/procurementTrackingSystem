import { combineReducers } from "redux";
import user from "./user";

const appReducer = combineReducers({
  user,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
