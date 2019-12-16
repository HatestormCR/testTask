import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../redux/sagas";
import {default as reduxSaga} from "./../redux/reducer"

const sagaMiddleware = createSagaMiddleware();

export function storeConfig(initialState) {
  const middleware = [thunk, sagaMiddleware];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reduxSaga, initialState, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}
