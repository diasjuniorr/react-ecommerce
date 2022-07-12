/// <reference types="redux-persist" />
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { rootReducer } from "./root-educer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const middlewares = [logger, thunk];

const composeEnhancers = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  process.env.NODE_ENV === "development" ? composeEnhancers : undefined
);

export const persistor = persistStore(store);
