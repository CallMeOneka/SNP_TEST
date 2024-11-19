import { LOCATION_CHANGE } from "connected-react-router";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { testApi } from "../../API/api";
import {
  EMPTY_ERROR,
  LOAD_TEST_LIST,
  LOAD_TEST_LIST_ERROR,
  CHANGE_FETCHING,
} from "../reducers/testReducer";

function* getTestList() {
  try {
    yield put({ type: CHANGE_FETCHING });
    const request = yield call(testApi.getTestList);
    console.log(request);
    yield put({ type: LOAD_TEST_LIST, payload: request });
    yield put({ type: CHANGE_FETCHING });
  } catch (e) {
    yield put({ type: CHANGE_FETCHING });
    yield put({ type: LOAD_TEST_LIST_ERROR, payload: e.response.data.error });
  }
}
function* createTest(params) {
  try {
    const request = yield call(testApi.createTest, params.payload);
    console.log(request);
  } catch (e) {}
}

function* watchGetTestList() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);
    if (action.payload.location.pathname.endsWith("/")) {
      yield put({ type: EMPTY_ERROR });
      yield fork(getTestList);
    }
  }
}

function* watchCreateTest() {
  yield takeEvery("CREATE_TEST", createTest);
}

export function* testSagas() {
  yield all([watchGetTestList(), watchCreateTest()]);
}
