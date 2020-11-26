import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux"

import createSagaMiddleware from "redux-saga";
import { watchSignin } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  allReducer,
  applyMiddleware(sagaMiddleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

sagaMiddleware.run(watchSignin);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
