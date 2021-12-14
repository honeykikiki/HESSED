import immer, { produce } from 'immer';
import { dummyUser } from '../hooks/reducer/APIResultChange';
import { MY_POST_AND_SAVE_POST_GET_SUCCESS } from './userPost';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logInFailed: true, // 로그인 실패

  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,

  changeProfileLoading: false, // 프로필 이미지 수정
  changeProfileDone: false,
  changeProfileError: null,
  changeProfileSuccess: false,

  me: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_PROFILE_REQUEST = 'CHANGE_PROFILE_REQUEST';
export const CHANGE_PROFILE_SUCCESS = 'CHANGE_PROFILE_SUCCESS';
export const CHANGE_PROFILE_FAILURE = 'CHANGE_PROFILE_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        // draft.me = dummyUser();
        if (action.data.result === 'SUCCESS') {
          draft.me = dummyUser(action.data.member); //action.data;
          draft.logInLoading = false;
          draft.logInDone = true;
          draft.logInFailed = true;
        } else {
          draft.logInLoading = false;
          draft.logInDone = false;
          draft.logInFailed = false;
        }
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      //로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        if (action.data.result === 'LOGOUT') {
          draft.logOutLoading = false;
          draft.logOutDone = true;
          draft.me = null;
        } else {
          draft.logOutLoading = false;
          draft.logOutDone = false;
        }
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      // 프로필 이미지 수정하기
      case CHANGE_PROFILE_REQUEST:
        draft.changeProfileLoading = true;
        draft.changeProfileDone = false;
        draft.changeProfileError = null;
        break;
      case CHANGE_PROFILE_SUCCESS: {
        draft.changeProfileLoading = false;
        draft.changeProfileDone = true;
        draft.changeProfileError = null;
        draft.changeProfileSuccess = true;
        draft.me.profileImg = action.data;
        break;
      }
      case CHANGE_PROFILE_FAILURE:
        draft.changeProfileDone = false;
        draft.changeProfileError = action.error;
        break;

      case MY_POST_AND_SAVE_POST_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.me = dummyUser(action.data.memberVO);
          draft.changeProfileSuccess = false;
        } else if (action.data.result === 'FAILED') {
          draft.changeProfileSuccess = true;
        }
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
