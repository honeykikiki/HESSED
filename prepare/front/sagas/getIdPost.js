import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestGet } from '../hooks/API';

import {
  GET_ID_POST_REQUEST,
  GET_ID_POST_SUCCESS,
  GET_ID_POST_FAILURE,
} from '../reducers/getIdPost';

// 특정 게시물  가져오기
function* getIdPost(action) {
  try {
    let url = `/board/view/${action.data.bo_no}`;
    if (action.data.mem_id) {
      url = `/board/view/${action.data.bo_no}?mem_id=${action.data.mem_id}`;
    }
    const result = yield call(commonRequestGet, action.data, url);
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
  yield all([fork(watchGetIdPost)]);
}
