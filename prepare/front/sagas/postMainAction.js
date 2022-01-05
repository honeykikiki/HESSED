import { all, fork, put, call, takeLatest, throttle } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';

import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REPLY_REQUEST,
  ADD_COMMENT_REPLY_SUCCESS,
  ADD_COMMENT_REPLY_FAILURE,
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
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
  UNSAVE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_MORE_POSTS_REQUEST,
  LOAD_MORE_POSTS_SUCCESS,
  LOAD_MORE_POSTS_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
} from '../reducers/postMainAction';

// 댓글가져오기
function* loadComment(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      '/comment/list.do',
    );
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

// 댓글달기
function* addPostComment(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      '/comment/insert.do',
    );
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
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
function* removeComment(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      '/comment/delete.do',
    );
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
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
function* addPostCommentReply(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      '/comment/reply.do',
    );
    yield put({
      type: ADD_COMMENT_REPLY_SUCCESS,
      data: result.data,
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
function* removeCommentReply(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      '/comment/delete.do',
    );
    yield put({
      type: REMOVE_COMMENT_REPLY_SUCCESS,
      data: result.data,
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
function* likePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/good/check.do?bo_no=${action.data.bo_no}&mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
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
function* unLikePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/good/checkOut.do?bo_no=${action.data.bo_no}&mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

// 게시물 저장
function* savePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/save.do?bo_no=${action.data.bo_no}&mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: SAVE_POST_SUCCESS,
      data: result.data,
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
function* unSavePost(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/cancel.do?bo_no=${action.data.bo_no}&mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: UNSAVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNSAVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 게시물 가져오기
function* loadPosts(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/board/list.do?mem_id=${action.data.mem_id}`,
    );
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}
// 게시물 더 가져오기
function* loadMorePosts(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/board/list.do`);
    yield put({
      type: LOAD_MORE_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MORE_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComment);
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

function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}

function* watchUnSavePost() {
  yield takeLatest(UNSAVE_POST_REQUEST, unSavePost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

// function* watchLoadMorePosts() {
//   yield throttle(5000, LOAD_MORE_POSTS_REQUEST, loadMorePosts);
// }

function* watchLoadMorePosts() {
  yield takeLatest(LOAD_MORE_POSTS_REQUEST, loadMorePosts);
}

export default function* postMainActionSaga() {
  yield all([
    fork(watchAddPostComment),
    fork(watchAddRemoveComment),
    fork(watchAddPostCommentReply),
    fork(watchAddRemoveCommentReply),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchSavePost),
    fork(watchUnSavePost),
    fork(watchLoadPosts),
    fork(watchLoadMorePosts),
    fork(watchLoadComments),
  ]);
}
