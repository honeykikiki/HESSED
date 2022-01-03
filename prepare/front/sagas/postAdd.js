import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
} from '../reducers/postAdd';

// 게시물 등록하기
function* addPost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/insert.do`,
    );

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

// 게시물 수정
function* updatePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/update.do`,
    );
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPDATE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

// 게시물 삭제하기
function* removePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/delete.do`,
    );
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postAddSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchUpdatePost)]);
}
