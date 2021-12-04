import immer, { produce } from 'immer';
import { dummyUser } from '../hooks/reducer/APIResultChange';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logInFailed: true, // 로그인 실패

  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,

  changeNicknameLoading: false, // 닉네임 수정
  changeNicknameDone: false,
  changeNicknameError: null,

  changeProfileImgLoading: false, // 프로필 이미지 수정
  changeProfileImgDone: false,
  changeProfileImgError: null,

  me: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const CHANGE_PROFILEIMG_REQUEST = 'CHANGE_PROFILEIMG_REQUEST';
export const CHANGE_PROFILEIMG_SUCCESS = 'CHANGE_PROFILEIMG_SUCCESS';
export const CHANGE_PROFILEIMG_FAILURE = 'CHANGE_PROFILEIMG_FAILURE';

// 혼자할떄
// const dummyUser = (data) => ({
//   ...data,
//   no: 1,
//   id: 'data.mem_id',
//   name: 'data.mem_name',
//   nickname: 'data.mem_nickname',
//   profileImg: null,
//   grade: 'data.mem_grade',
//   Posts: [],
//   Liked: [],
//   Saved: [],
// });

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

      // 닉네임 수정하기
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.changeNicknameError = null;
        draft.myPost = action.data;
        break;
      }
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      // 프로필 이미지 수정하기
      case CHANGE_PROFILEIMG_REQUEST:
        draft.changeProfileImgLoading = true;
        draft.changeProfileImgDone = false;
        draft.changeProfileImgError = null;
        break;
      case CHANGE_PROFILEIMG_SUCCESS: {
        draft.changeProfileImgLoading = false;
        draft.changeProfileImgDone = true;
        draft.changeProfileImgError = null;
        draft.me.profileImg = action.data;
        break;
      }
      case CHANGE_PROFILEIMG_FAILURE:
        draft.changeProfileImgDone = false;
        draft.changeProfileImgError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
