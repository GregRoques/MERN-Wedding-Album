import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import reducers from "./Redux/rootReducers"
// import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App";

const history = createBrowserHistory();

// const theStore = createStore(
//   // reducers,
//   applyMiddleware(thunk)
// );

ReactDOM.render(
  // <Provider store={theStore}>
  <Router history={history}>
    <App />
  </Router>,
  // </Provider>,
  document.getElementById("root")
);
