import { all, fork } from 'redux-saga/effects';
import axois from 'axios';

import postSaga from './post';
import userSaga from './user';

axois.defaults.baseURL = 'http://192.168.45.247:8081';
axois.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
