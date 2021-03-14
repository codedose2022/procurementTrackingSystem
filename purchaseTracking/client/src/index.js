import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/";
import {
  loadFromStorage,
  saveToStorage,
} from "./reducers/ConfigStore";
import App from "./App";

const persistedState = loadFromStorage();
const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => saveToStorage(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
