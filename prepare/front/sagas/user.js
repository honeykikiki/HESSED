import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
  UNSAVE_POST_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_PROFILEIMG_REQUEST,
  CHANGE_PROFILEIMG_SUCCESS,
  CHANGE_PROFILEIMG_FAILURE,
} from '../reducers/user';

// 로그인
function loginAPI(data) {
  return axios.post(`/user/login`, data);
}

function* logIn(action) {
  try {
    console.log('saga logIn');
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
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
  return axios.post(`/user/logOut`, data);
}

function* logOut(action) {
  try {
    console.log('saga logOut');
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
// 회원가입
function signUpAPI(data) {
  return axios.post(`/user`, data);
}

function* signUp(action) {
  try {
    console.log('saga signUp');
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시물 저장
function savePostAPI(data) {
  return axios.post(`/user/saved`, data);
}

function* savePost(action) {
  try {
    // const result = yield call(savePostAPI);
    yield delay(1000);
    yield put({
      type: SAVE_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
// 게시물 저장 취소
function unSavePostAPI(data) {
  return axios.delete(`/user/saved`, data);
}

function* unSavePost(action) {
  try {
    // const result = yield call(unSavePostAPI);
    yield delay(1000);
    yield put({
      type: UNSAVE_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNSAVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 닉네임 수정
function changeNicknameAPI(data) {
  return axios.post(`/user/nickname`, data);
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
  return axios.post(`/user/profileImg`, data);
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
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}
function* watchUnSavePost() {
  yield takeLatest(UNSAVE_POST_REQUEST, unSavePost);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchChangeProfileImg() {
  yield takeLatest(CHANGE_PROFILEIMG_REQUEST, changeProfileImg);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchSavePost),
    fork(watchUnSavePost),
    fork(watchChangeNickname),
    fork(watchChangeProfileImg),
  ]);
}
