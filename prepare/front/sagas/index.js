import { all, fork } from 'redux-saga/effects';
import axois from 'axios';
import { baseURL } from '../config/config';

import postSaga from './post';
import userSaga from './user';

// axois.defaults.baseURL = 'http://localhost:3030';
axois.defaults.baseURL = 'http://192.168.45.247:8081'; // 교회
// axois.defaults.baseURL = 'http://211.244.21.147:8081'; /// 현준이형집
// axois.defaults.baseURL = baseURL;

axois.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
