import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import modalReducer from "./reducers/modalReducer";
import rootSaga from "./sagas";
import testReducer from "./reducers/testReducer";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

let reducers = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  test: testReducer,
  router: connectRouter(history),
});

let store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, routerMiddleware(history))
);
sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
