import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REPLY_REQUEST,
  ADD_COMMENT_REPLY_SUCCESS,
  ADD_COMMENT_REPLY_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REPLY_REQUEST,
  REMOVE_COMMENT_REPLY_SUCCESS,
  REMOVE_COMMENT_REPLY_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
} from '../reducers/post';

// 게시물 등록하시
function addPostAPI(data) {
  return axios.delete(`/post/${data.postId}`);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
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

//댓글달기
function addPostCommentAPI(data) {
  return axios.post(`/post/${data.postId}`, data);
}

function* addPostComment(action) {
  try {
    // const result = yield call(addPostCommentAPI, action.data)
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}
// 댓글 삭제하기
function removeCommentAPI(data) {
  return axios.delete(`post/${data.postId}/Comment`);
}

function* removeComment(action) {
  try {
    // const result = yield call(removeCommentAPI, action.data)
    yield delay(1000);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

// 댓글에 답글달기
function addPostCommentReplyAPI(data) {
  return axios.post(`/post/${data.postId}/comment/${data.commentId}`, data);
}

function* addPostCommentReply(action) {
  try {
    // const result = yield call(addPostCommentReplyAPI, action.data)
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_REPLY_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_REPLY_FAILURE,
      data: error.response.data,
    });
  }
}
// 댓글의 답글 삭제하기
function removeCommentReplyAPI(data) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
}

function* removeCommentReply(action) {
  try {
    // const result = yield call(removeCommentReplyAPI, action.data)
    yield delay(1000);
    yield put({
      type: REMOVE_COMMENT_REPLY_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_COMMENT_REPLY_FAILURE,
      data: error.response.data,
    });
  }
}

// 좋아요
function likePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    // const result = yield call(likePostAPI, action.data)
    yield delay(1000);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      data: error.response.data,
    });
  }
}
// 좋아요 취소
function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  try {
    // const result = yield call(unLikePostAPI, action.data)
    yield delay(1000);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddPostComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addPostComment);
}

function* watchAddRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchAddPostCommentReply() {
  yield takeLatest(ADD_COMMENT_REPLY_REQUEST, addPostCommentReply);
}

function* watchAddRemoveCommentReply() {
  yield takeLatest(REMOVE_COMMENT_REPLY_REQUEST, removeCommentReply);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

export default function* userSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddPostComment),
    fork(watchAddRemoveComment),
    fork(watchAddPostCommentReply),
    fork(watchAddRemoveCommentReply),
    fork(watchLikePost),
    fork(watchUnLikePost),
  ]);
}
