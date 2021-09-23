import { all, fork } from 'redux-saga/effects';
import axois from 'axios';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}