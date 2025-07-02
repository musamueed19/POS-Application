import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { rootReducer } from "./redux/rootReducer.jsx";

// combine all the reducers
const finalReducer = combineReducers({
  rootReducer: rootReducer,
});

// initialState of all reducers
const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

// creating store(finalReducer, initialState)
const store = createStore(finalReducer, initialState);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
