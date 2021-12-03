import { all, fork } from 'redux-saga/effects';
import axois from 'axios';
import { baseURL } from '../config/config';

import postSaga from './post';
import userSaga from './user';

axois.defaults.baseURL = baseURL;

axois.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
