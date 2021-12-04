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
  GET_ID_POST_REQUEST,
  GET_ID_POST_SUCCESS,
  GET_ID_POST_FAILURE,
} from '../reducers/getIdPost';

// 특정 게시물  가져오기
function getIdPostAPI(data) {
  // return axios.get(`/board/list.do?page=${data.page}`, data);
  return axios.get(`/board/view/${data.bo_no}`, data);
}

function* getIdPost(action) {
  try {
    const result = yield call(getIdPostAPI, action.data);
    yield put({
      type: GET_ID_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_ID_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchGetIdPost() {
  yield takeLatest(GET_ID_POST_REQUEST, getIdPost);
}

export default function* getIdPostSaga() {
  fork(watchGetIdPost), yield all([]);
}
