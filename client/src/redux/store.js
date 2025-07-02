import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducer"; // your existing reducer

const persistConfig = {
  key: "root", // key for the localStorage key
  storage, // storage engine
  whitelist: ["user"], // only persist the user reducer (optional)
  // blacklist: ['cartItems'] // don't persist these reducers (optional)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
