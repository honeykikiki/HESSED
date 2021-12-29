import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestGet } from '../hooks/API';

import {
  GET_ID_POST_REQUEST,
  GET_ID_POST_SUCCESS,
  GET_ID_POST_FAILURE,
  GET_GOOD_LIST_REQUEST,
  GET_GOOD_LIST_SUCCESS,
  GET_GOOD_LIST_FAILURE,
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

// 특정 게시물 좋아요 리스트 가져오기
function* postGoodList(action) {
  try {
    const result = yield call(
      commonRequestGet,
      action.data,
      `/good/goodList.do?bo_no=${action.data.postId}`,
    );
    yield put({
      type: GET_GOOD_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_GOOD_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchGetIdPost() {
  yield takeLatest(GET_ID_POST_REQUEST, getIdPost);
}
function* watchPostGoodList() {
  yield takeLatest(GET_GOOD_LIST_REQUEST, postGoodList);
}

export default function* getIdPostSaga() {
  yield all([fork(watchGetIdPost), fork(watchPostGoodList)]);
}
