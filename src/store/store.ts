/// <reference types="redux-persist" />
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-educer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  process.env.NODE_ENV === "development" ? composeEnhancers : undefined
);

export const persistor = persistStore(store);
