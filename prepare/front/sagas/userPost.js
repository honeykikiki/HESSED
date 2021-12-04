import axios from 'axios';

import {
  all,
  fork,
  put,
  call,
  delay,
  takeLatest,
  throttle,
} from 'redux-saga/effects';

import {
  MY_POST_GET_REQUEST,
  MY_POST_GET_SUCCESS,
  MY_POST_GET_FAILURE,
  MY_POST_MORE_GET_REQUEST,
  MY_POST_MORE_GET_SUCCESS,
  MY_POST_MORE_GET_FAILURE,
} from '../reducers/userPost';

// 작성 게시물 받아오기
function myPostGetAPI(data) {
  return axios.post(`/profile.do?mem_id=${data.mem_id}`, data);
}

function* myPostGet(action) {
  try {
    const result = yield call(myPostGetAPI, action.data);
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
function myPostMoreGetAPI(data) {
  return axios.post(`/profile/list.do?mem_id=${data.mem_id}`, data);
}

function* myPostMoreGet(action) {
  try {
    const result = yield call(myPostMoreGetAPI, action.data);
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

function* watchMyPostGet() {
  yield takeLatest(MY_POST_GET_REQUEST, myPostGet);
}

function* watchMyPostMoreGet() {
  yield takeLatest(MY_POST_MORE_GET_REQUEST, myPostMoreGet);
}

export default function* userPostSaga() {
  yield all([fork(watchMyPostGet), fork(watchMyPostMoreGet)]);
}
