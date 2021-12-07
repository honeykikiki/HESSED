import axios from 'axios';

import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';

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
function addPostAPI(data) {
  return axios.post(
    // `/board/insert.do?bo_writer=${data.bo_writer}&bo_content=${data.bo_content}&bo_image=${data.bo_image}`,
    `/board/insert.do`,
    data,
  );
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
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
function updatePostAPI(data) {
  return axios.post(`/board/insert.do`, data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
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
function removePostAPI(data) {
  return axios.delete(`/post/${data.postId}`);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data)
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
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
