import { put, takeLatest } from "redux-saga/effects";
import { createOtherBoard, createOtherUser } from "../libs/util/dummyCreator";
import {
  GET_BOARDS_FAILURE,
  GET_BOARDS_REQUEST,
  GET_BOARDS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  LOAD_BOARDS_FAILURE,
  LOAD_BOARDS_REQUEST,
  LOAD_BOARDS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
} from "../reducers/totalData";

function* loadBoardsSaga() {
  try {
    const res = createOtherBoard();

    if (localStorage.getItem("currentTotalBoards")) {
      localStorage.removeItem("currentTotalBoards");
    }
    localStorage.setItem("currentTotalBoards", JSON.stringify(res));

    yield put({ type: LOAD_BOARDS_SUCCESS });

  } catch (error) {

    yield put({ type: LOAD_BOARDS_FAILURE, error });

  }
}
function* loadUsersSaga() {
  try {
    const res = createOtherUser();

    if (localStorage.getItem("currentTotalUsers")) {
      localStorage.removeItem("currentTotalUsers");
    }

    localStorage.setItem("currentTotalUsers", JSON.stringify(res));

    yield put({ type: LOAD_USERS_SUCCESS});

  } catch (error) {

    yield put({ type: LOAD_USERS_FAILURE, error });
  }
}

function* getUsersSaga(){
  try{
    const res = localStorage.getItem("currentTotalUsers");
    yield put({ type: GET_USERS_SUCCESS, TotalUsers: JSON.parse(res) });
  }catch(error){
    yield put({ type: GET_USERS_FAILURE, error });
  }
}

function* getBoardsSaga(){
  try{
    const res = localStorage.getItem("currentTotalBoards");
    yield put({ type: GET_BOARDS_SUCCESS, TotalBoards: JSON.parse(res) });
  }catch(error){
    yield put({ type: GET_BOARDS_FAILURE, error });
  }
}
export function* watchTotalData() {
  yield takeLatest(LOAD_BOARDS_REQUEST, loadBoardsSaga);
  yield takeLatest(LOAD_USERS_REQUEST, loadUsersSaga);
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(GET_BOARDS_REQUEST, getBoardsSaga);
}