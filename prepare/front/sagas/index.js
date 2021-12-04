import { all, fork } from 'redux-saga/effects';
import axois from 'axios';
import { baseURL } from '../config/config';

import postAddSaga from './postAdd';
import userPostSaga from './userPost';
import getIdPostSaga from './getIdPost';
import postMainAction from './postMainAction';

import userInfoSaga from './userInfo';
import userSignSaga from './userSign';

axois.defaults.baseURL = baseURL;

axois.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userInfoSaga),
    fork(userSignSaga),
    fork(postAddSaga),
    fork(userPostSaga),
    fork(getIdPostSaga),
    fork(postMainAction),
  ]);
}
