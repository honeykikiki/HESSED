import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostCommentAPI(data) {
  return axios.post('/post', data);
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

function* watchAddPostComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addPostComment);
}

export default function* userSaga() {
  yield all([fork(watchAddPostComment)]);
}
