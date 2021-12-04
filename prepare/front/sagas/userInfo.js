import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_PROFILEIMG_REQUEST,
  CHANGE_PROFILEIMG_SUCCESS,
  CHANGE_PROFILEIMG_FAILURE,
} from '../reducers/userInfo';

// 로그인
function logInAPI(data) {
  return axios.post(`/login.do`, data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function logOutAPI(data) {
  return axios.post(`/logout.do`, data);
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.data);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 닉네임 수정
function changeNicknameAPI(data) {
  return axios.patch(``, data);
}

function* changeNickname(action) {
  try {
    // const result = yield call(changeNicknameAPI);
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

// 프로필 이미지 수정
function changeProfileImgAPI(data) {
  return axios.patch(``, data);
}

function* changeProfileImg(action) {
  try {
    // const result = yield call(changeProfileImgAPI);
    yield delay(1000);
    yield put({
      type: CHANGE_PROFILEIMG_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_PROFILEIMG_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchChangeProfileImg() {
  yield takeLatest(CHANGE_PROFILEIMG_REQUEST, changeProfileImg);
}

export default function* userInfoSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchChangeNickname),
    fork(watchChangeProfileImg),
  ]);
}
