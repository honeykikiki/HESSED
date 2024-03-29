import { all, fork } from 'redux-saga/effects';
import axois from 'axios';
import { baseURL } from '../config/config';

import postAddSaga from './postAdd';
import userPostSaga from './userPost';
import getIdPostSaga from './getIdPost';
import postMainAction from './postMainAction';
import content from './content';

import userInfoSaga from './userInfo';
import userSignSaga from './userSign';

axois.defaults.baseURL = baseURL;
axois.defaults.withCredentials = true;
axois.defaults.headers = {
  'Content-Type': 'application/json',
  // eslint-disable-next-line no-dupe-keys
  'Content-Type': 'multipart/form-data',
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
};

export default function* rootSaga() {
  yield all([
    fork(userInfoSaga),
    fork(userSignSaga),
    fork(postAddSaga),
    fork(userPostSaga),
    fork(getIdPostSaga),
    fork(postMainAction),
    fork(content),
  ]);
}
