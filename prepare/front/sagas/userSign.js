import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { commonRequestPost } from '../hooks/API';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SEARCH_ID_REQUEST,
  SEARCH_ID_SUCCESS,
  SEARCH_ID_FAILURE,
  SEARCH_PW_REQUEST,
  SEARCH_PW_SUCCESS,
  SEARCH_PW_FAILURE,
  DUPLICATE_CHECK_REQUEST,
  DUPLICATE_CHECK_SUCCESS,
  DUPLICATE_CHECK_FAILURE,
  CERIFIED_REQUEST,
  CERIFIED_SUCCESS,
  CERIFIED_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
} from '../reducers/userSign';

// 혼자할떄;
// function* logIn(action) {
//   try {
//     delay(1000);
//     yield put({
//       type: LOG_IN_SUCCESS,
//       data: action.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOG_IN_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// 회원가입
function* signUp(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/register.do`);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// 아이디찾기
function* searchId(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/findID.do`);
    yield put({
      type: SEARCH_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_ID_FAILURE,
      error: err.response.data,
    });
  }
}

// 비밀번호찾기
function* searchPw(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/findPW.do`);
    yield put({
      type: SEARCH_PW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_PW_FAILURE,
      error: err.response.data,
    });
  }
}

// 인증번호
function* certified(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/pwAccount.do`);
    yield put({
      type: CERIFIED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CERIFIED_FAILURE,
      error: err.response.data,
    });
  }
}

// 비밀번호 바꾸기
function* pwChange(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/pwUpdate.do`);
    yield put({
      type: PASSWORD_CHANGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PASSWORD_CHANGE_FAILURE,
      error: err.response.data,
    });
  }
}

// 아이디 중복체크
function* duplicateCheck(action) {
  try {
    const result = yield call(commonRequestPost, action.data, `/idCheck.do`);
    yield put({
      type: DUPLICATE_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DUPLICATE_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchSearchId() {
  yield takeLatest(SEARCH_ID_REQUEST, searchId);
}
function* watchSearchPw() {
  yield takeLatest(SEARCH_PW_REQUEST, searchPw);
}
function* watchCertified() {
  yield takeLatest(CERIFIED_REQUEST, certified);
}

function* watchPwChange() {
  yield takeLatest(PASSWORD_CHANGE_REQUEST, pwChange);
}
function* watchDuplicateCheck() {
  yield takeLatest(DUPLICATE_CHECK_REQUEST, duplicateCheck);
}

export default function* userSignSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSearchId),
    fork(watchSearchPw),
    fork(watchCertified),
    fork(watchPwChange),
    fork(watchDuplicateCheck),
  ]);
}
