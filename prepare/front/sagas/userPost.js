import { all, fork, put, call, takeLatest, throttle } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';

import {
  MY_POST_AND_SAVE_POST_GET_REQUEST,
  MY_POST_AND_SAVE_POST_GET_SUCCESS,
  MY_POST_AND_SAVE_POST_GET_FAILURE,
  MY_POST_MORE_GET_REQUEST,
  MY_POST_MORE_GET_SUCCESS,
  MY_POST_MORE_GET_FAILURE,
  MY_SAVE_POST_MORE_GET_REQUEST,
  MY_SAVE_POST_MORE_GET_SUCCESS,
  MY_SAVE_POST_MORE_GET_FAILURE,
  USER_POST_MORE_GET_REQUEST,
  USER_POST_MORE_GET_SUCCESS,
  USER_POST_MORE_GET_FAILURE,
  USER_SAVE_POST_MORE_GET_REQUEST,
  USER_SAVE_POST_MORE_GET_SUCCESS,
  USER_SAVE_POST_MORE_GET_FAILURE,
  USER_POST_AND_SAVE_POST_GET_REQUEST,
  USER_POST_AND_SAVE_POST_GET_SUCCESS,
  USER_POST_AND_SAVE_POST_GET_FAILURE,
} from '../reducers/userPost';

// 내가 작성 게시물 및 저장 게시글 받아오기
function* myPostGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: MY_POST_AND_SAVE_POST_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_POST_AND_SAVE_POST_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 내가 작성 게시물 더 받아오기
function* myPostMoreGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile/list.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: MY_POST_MORE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_POST_MORE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 내가 작성 게시물 더 받아오기
function* mySavePostMoreGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile/savelist.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: MY_SAVE_POST_MORE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_SAVE_POST_MORE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저가 작성 게시물 및 저장 게시글 받아오기
function* userPostGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: USER_POST_AND_SAVE_POST_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_POST_AND_SAVE_POST_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저가 작성 게시물 더 받아오기
function* userPostMoreGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile/list.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: USER_POST_MORE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_POST_MORE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저가 작성 게시물 더 받아오기
function* userSavePostMoreGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile/savelist.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: USER_SAVE_POST_MORE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SAVE_POST_MORE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 작성한 게시글 저장한 게시글
function* watchMyPostGet() {
  yield takeLatest(MY_POST_AND_SAVE_POST_GET_REQUEST, myPostGet);
}

function* watchMyPostMoreGet() {
  yield takeLatest(MY_POST_MORE_GET_REQUEST, myPostMoreGet);
}

function* watchMySavePostMoreGet() {
  yield takeLatest(MY_SAVE_POST_MORE_GET_REQUEST, mySavePostMoreGet);
}

function* watchUserPostGet() {
  yield takeLatest(USER_POST_AND_SAVE_POST_GET_REQUEST, userPostGet);
}

function* watchUserPostMoreGet() {
  yield takeLatest(USER_POST_MORE_GET_REQUEST, userPostMoreGet);
}

function* watchUserSavePostMoreGet() {
  yield takeLatest(USER_SAVE_POST_MORE_GET_REQUEST, userSavePostMoreGet);
}

export default function* userPostSaga() {
  yield all([
    fork(watchMyPostGet),
    fork(watchMyPostMoreGet),
    fork(watchMySavePostMoreGet),
    fork(watchUserPostGet),
    fork(watchUserPostMoreGet),
    fork(watchUserSavePostMoreGet),
  ]);
}
