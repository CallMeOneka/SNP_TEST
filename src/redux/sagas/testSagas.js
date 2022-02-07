import { LOCATION_CHANGE, push } from "connected-react-router";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { testApi } from "../../API/api";
import {
  EMPTY_ERROR,
  LOAD_TEST_LIST,
  LOAD_TEST_LIST_ERROR,
  CHANGE_FETCHING,
  GET_CURRENT_TEST,
  CREATE_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION,
  ADD_ANSWER,
  DELETE_ANSWER,
  EDIT_ANSWER,
} from "../reducers/testReducer";

function* getTestList() {
  try {
    yield put({ type: CHANGE_FETCHING });
    const request = yield call(testApi.getTestList);
    yield put({ type: LOAD_TEST_LIST, payload: request.tests });
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

function* getTest(params) {
  try {
    const request = yield call(testApi.getCurrentTest, params);
    yield put({ type: GET_CURRENT_TEST, payload: request });
  } catch (e) {
    console.log(e);
  }
}

function* editTest(params) {
  try {
    console.log(params);
    yield call(testApi.editTest, params);
    yield put(push("/"));
  } catch (e) {
    console.log(e);
  }
}

function* deleteTest(params) {
  try {
    yield call(testApi.deleteTest, params.payload);
    yield put(push("/"));
  } catch (e) {
    console.log(e);
  }
}

function* editQuestion(params) {
  try {
    const request = yield call(testApi.editQuestion, params);
    yield put({ type: EDIT_QUESTION, payload: request });
  } catch (e) {
    console.log(e);
  }
}

function* deleteQuestion(params) {
  try {
    yield call(testApi.deleteQuestion, params);
    yield put({ type: DELETE_QUESTION, payload: params });
  } catch (e) {
    console.log(e);
  }
}

function* addQuestion(params) {
  try {
    const request = yield call(testApi.createQuestion, params);
    yield put({ type: CREATE_QUESTION, payload: request });
  } catch (e) {
    console.log(e);
  }
}

function* addAnswer(params) {
  try {
    const request = yield call(testApi.createAnswer, params);
    console.log(request);
    yield put({
      type: ADD_ANSWER,
      question_id: params.question_id,
      payload: request,
    });
  } catch (e) {
    console.log(e);
  }
}

function* editAnswer(params) {
  try {
    const request = yield call(testApi.editAnswer, params);
    yield put({ type: EDIT_ANSWER, payload: request });
  } catch (e) {
    console.log(e);
  }
}

function* deleteAnswer(params) {
  try {
    const request = yield call(testApi.deleteAnswer, params);
    yield put({ type: DELETE_ANSWER, payload: params });
  } catch (e) {
    console.log(e);
  }
}

function* watchDeleteAnswer() {
  yield takeEvery("DELETE_ANSWER", deleteAnswer);
}

function* watchEditAnswer() {
  yield takeEvery("EDIT_ANSWER", editAnswer);
}

function* watchAddAnswer() {
  yield takeEvery("ADD_ANSWER", addAnswer);
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

function* watchEditTest() {
  yield takeEvery("EDIT_TEST", editTest);
}

function* watchDeleteTest() {
  yield takeEvery("DELETE_TEST", deleteTest);
}

function* watchDeleteQuestion() {
  yield takeEvery("DELETE_QUESTION", deleteQuestion);
}

function* watchAddQuestion() {
  yield takeEvery("CREATE_QUESTION", addQuestion);
}

function* watchEditQuestion() {
  yield takeEvery("EDIT_QUESTION", editQuestion);
}

function* watchGetCurrentTest() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);
    if (action.payload.location.pathname.startsWith("/testedit/")) {
      yield call(getTest, action.payload.location.pathname.substring(10));
    }
  }
}
function* watchCreateTest() {
  yield takeEvery("CREATE_TEST", createTest);
}

export function* testSagas() {
  yield all([
    watchGetTestList(),
    watchCreateTest(),
    watchGetCurrentTest(),
    watchAddQuestion(),
    watchEditQuestion(),
    watchDeleteQuestion(),
    watchDeleteTest(),
    watchEditTest(),
    watchAddAnswer(),
    watchEditAnswer(),
    watchDeleteAnswer(),
  ]);
}
