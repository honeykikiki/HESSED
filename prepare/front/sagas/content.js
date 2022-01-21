import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';

import {
  GET_NOTICE_FAILURE,
  GET_NOTICE_REQUEST,
  GET_NOTICE_SUCCESS,
} from '../reducers/content';

// 공지사항 가져오기
function* getNotice(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/notice/list.do`,
    );
    yield put({
      type: GET_NOTICE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_NOTICE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchNotice() {
  yield takeLatest(GET_NOTICE_REQUEST, getNotice);
}

export default function* contentSaga() {
  yield all([fork(watchNotice)]);
}
