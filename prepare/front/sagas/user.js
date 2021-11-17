import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
  UNSAVE_POST_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_PROFILEIMG_REQUEST,
  CHANGE_PROFILEIMG_SUCCESS,
  CHANGE_PROFILEIMG_FAILURE,
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
} from '../reducers/user';

// 로그인
function logInAPI(data) {
  return axios.post(`/login.do`, data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
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

// 로그아웃
function logOutAPI(data) {
  return axios.post(`/logout.do`, data);
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.data);
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

// 회원가입
function signUpAPI(data) {
  console.log(data);
  return axios.post(`/register.do`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
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

// 게시물 저장
function savePostAPI(data) {
  return axios.post(
    `/board/save.do?bo_no=${data.bo_no}&mem_id=${data.mem_id}`,
    data,
  );
}

function* savePost(action) {
  try {
    const result = yield call(savePostAPI, action.data);
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
function unSavePostAPI(data) {
  return axios.post(
    `/board/cancel.do?bo_no=${data.bo_no}&mem_id=${data.mem_id}`,
    data,
  );
}

function* unSavePost(action) {
  try {
    const result = yield call(unSavePostAPI, action.data);
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

// 닉네임 수정
function changeNicknameAPI(data) {
  return axios.patch(``, data);
}

function* changeNickname(action) {
  try {
    // const result = yield call(changeNicknameAPI);
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

// 프로필 이미지 수정
function changeProfileImgAPI(data) {
  return axios.patch(``, data);
}

function* changeProfileImg(action) {
  try {
    // const result = yield call(changeProfileImgAPI);
    yield delay(1000);
    yield put({
      type: CHANGE_PROFILEIMG_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_PROFILEIMG_FAILURE,
      error: err.response.data,
    });
  }
}

// 아이디찾기
function searchIdAPI(data) {
  return axios.post(`/findID.do`, data);
}

function* searchId(action) {
  try {
    const result = yield call(searchIdAPI, action.data);
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
function searchPwAPI(data) {
  return axios.post(`/findPW.do`, data);
}

function* searchPw(action) {
  try {
    const result = yield call(searchPwAPI, action.data);
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
function certifiedAPI(data) {
  return axios.post(`/pwAccount.do`, data);
}

function* certified(action) {
  try {
    const result = yield call(certifiedAPI, action.data);
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
function pwChangeAPI(data) {
  console.log(data);
  return axios.post(`/pwUpdate.do`, data);
}

function* pwChange(action) {
  try {
    const result = yield call(pwChangeAPI, action.data);
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
function duplicateCheckAPI(data) {
  return axios.post(`/idCheck.do`, data);
}

function* duplicateCheck(action) {
  try {
    const result = yield call(duplicateCheckAPI, action.data);
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

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}
function* watchUnSavePost() {
  yield takeLatest(UNSAVE_POST_REQUEST, unSavePost);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchChangeProfileImg() {
  yield takeLatest(CHANGE_PROFILEIMG_REQUEST, changeProfileImg);
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

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchSavePost),
    fork(watchUnSavePost),
    fork(watchChangeNickname),
    fork(watchChangeProfileImg),
    fork(watchSearchId),
    fork(watchSearchPw),
    fork(watchCertified),
    fork(watchPwChange),
    fork(watchDuplicateCheck),
  ]);
}
