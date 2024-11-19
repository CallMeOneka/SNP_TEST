import { all } from "redux-saga/effects";
import { authSagas } from "./sagas/authSagas";
import { testSagas } from "./sagas/testSagas";

export default function* rootSaga() {
  yield all([authSagas(), testSagas()]);
}
