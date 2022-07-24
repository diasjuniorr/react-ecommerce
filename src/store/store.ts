/// <reference types="redux-persist" />
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-educer";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

const composeEnhancers = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  process.env.NODE_ENV === "development" ? composeEnhancers : undefined
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
