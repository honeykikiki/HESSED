import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
} from '../reducers/userInfo';

// 로그인
function* logIn(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/login.do`);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// 로그아웃
function* logOut(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/logout.do`);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// 프로필 수정
function* changeProfile(action) {
  try {
    const result = yield call(
      commonRequestPost,
      action.data,
      `/profile/update.do`,
    );
    yield put({
      type: CHANGE_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_PROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchChangeProfile() {
  yield takeLatest(CHANGE_PROFILE_REQUEST, changeProfile);
}

export default function* userInfoSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchChangeProfile)]);
}
