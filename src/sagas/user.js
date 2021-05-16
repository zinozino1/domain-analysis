import { put, delay, takeLatest } from "redux-saga/effects";
import { createUser } from "../libs/util/dummyCreator";
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
} from "../reducers/user";

function* loadUserSaga() {
  try {
    yield delay(100);
    const res = createUser();
    yield put({ type: LOAD_USER_SUCCESS, user: res });
  } catch (error) {
    yield put({ type: LOAD_USER_FAILURE, error });
  }
}

function* loginSaga() {
  console.log("login");
  try {
    yield delay(100);
    const res = createUser();
    yield put({ type: LOGIN_SUCCESS, user: res });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error });
  }
}

export function* watchUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUserSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
