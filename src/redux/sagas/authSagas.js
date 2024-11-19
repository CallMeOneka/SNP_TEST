import { authApi } from "../../API/api";
import { takeEvery, put, call, all, take } from "redux-saga/effects";
import { LOGIN, LOGIN_ERROR, LOGOUT } from "../reducers/authReducer";
import { LOCATION_CHANGE, push } from "connected-react-router";

function* logIn(params) {
  try {
    const request = yield call(authApi.signin, params.payload);
    console.log("Запрос на авторизацию успешно");
    yield put({ type: LOGIN, payload: request });
    yield put(push("/"));
  } catch (e) {
    yield put({ type: LOGIN_ERROR, payload: e.response.data.error });
  }
}

function* signUp(params) {
  try {
    yield call(authApi.signup, params.payload);
    yield put(push("/login"));
  } catch (e) {
    yield put({
      type: LOGIN_ERROR,
      payload: e.response.data.username
        ? `Username ${e.response.data.username}`
        : e.response.data.error,
    });
  }
}
function* getCurrent() {
  try {
    const request = yield call(authApi.getCurrentUser);
    console.log(request);
  } catch (e) {
    console.log(e);
  }
}
function* logOut() {
  try {
    yield call(authApi.logout);
    yield put({ type: LOGOUT });
  } catch (e) {
    console.log(e);
  }
}

function* watchSignIn() {
  yield takeEvery("LOG_IN", logIn);
}

function* watchSignUp() {
  yield takeEvery("SIGN_UP", signUp);
}
function* watchGetCurrnentUser() {
  yield takeEvery("GET_CURRENT_USER", getCurrent);
}
function* watchSignOut() {
  yield takeEvery("LOG_OUT", logOut);
}

function* watchLocationChange() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);
    if (
      action.payload.location.pathname.endsWith("/login") ||
      action.payload.location.pathname.endsWith("/registry")
    ) {
      yield put({ type: LOGIN_ERROR, payload: "" });
    }
  }
}

export function* authSagas() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchGetCurrnentUser(),
    watchSignOut(),
    watchLocationChange(),
  ]);
}
