import { all, fork, put, call, takeLatest, throttle } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';

import {
  MY_POST_GET_REQUEST,
  MY_POST_GET_SUCCESS,
  MY_POST_GET_FAILURE,
  MY_POST_MORE_GET_REQUEST,
  MY_POST_MORE_GET_SUCCESS,
  MY_POST_MORE_GET_FAILURE,
  MY_SAVE_POST_GET_REQUEST,
  MY_SAVE_POST_GET_SUCCESS,
  MY_SAVE_POST_GET_FAILURE,
  MY_SAVE_POST_MORE_GET_REQUEST,
  MY_SAVE_POST_MORE_GET_SUCCESS,
  MY_SAVE_POST_MORE_GET_FAILURE,
} from '../reducers/userPost';

// 작성 게시물 받아오기
function* myPostGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: MY_POST_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_POST_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 작성 게시물 더 받아오기
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

// 저장 게시물 받아오기
function* mySavePostGet(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: MY_SAVE_POST_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_SAVE_POST_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// 작성 게시물 더 받아오기
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

//작성한 게시글
function* watchMyPostGet() {
  yield takeLatest(MY_POST_GET_REQUEST, myPostGet);
}

function* watchMyPostMoreGet() {
  yield takeLatest(MY_POST_MORE_GET_REQUEST, myPostMoreGet);
}
//저장한 게시글
function* watchMySavePostGet() {
  yield takeLatest(MY_SAVE_POST_GET_REQUEST, mySavePostGet);
}

function* watchMySavePostMoreGet() {
  yield takeLatest(MY_SAVE_POST_MORE_GET_REQUEST, mySavePostMoreGet);
}

export default function* userPostSaga() {
  yield all([
    fork(watchMyPostGet),
    fork(watchMyPostMoreGet),
    fork(watchMySavePostGet),
    fork(watchMySavePostMoreGet),
  ]);
}
