import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
// import store from "./store";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import reportWebVitals from "./reportWebVitals";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// import 'antd/dist/antd.css';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

window.addEventListener("storage", (e) => {
  // window.location.reload();
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
