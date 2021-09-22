import axios from 'axios';
import { all, fork, put, call, delay, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from '../reducers/user';

function loginAPI(data) {
  return axios.post(`/user/login`, data);
}

function* logIn(action) {
  try {
    console.log('saga logIn');
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([fork(watchLogIn)]);
}
