import produce from 'immer';
import { myPost } from '../hooks/reducer/APIResultChange';
import { LOG_IN_SUCCESS } from './userInfo';

export const initialState = {
  myPosts: [],
  savePosts: [],
  myPostsLength: null,
  myPostNickname: null,
  myPostprofileImg: null,

  myPostGetLoading: false, // 내가 작성한 게시글 받아오기
  myPostGetDone: false,
  myPostGetError: null,

  myPostMoreGetLoading: false, // 내가 작성한 더 게시글 받아오기
  myPostMoreGetDone: false,
  myPostMoreGetError: null,
  myPostMoreGetFailed: false,
  myPostPageNumber: 2,

  mySavePostMoreGetLoading: false, // 내가 저장한 더 게시글 받아오기
  mySavePostMoreGetDone: false,
  mySavePostMoreGetError: null,
  mySavePostMoreGetFailed: false,
  mySavePostPageNumber: 2,

  userPosts: [],
  userSavePosts: [],
  userPostsLength: null,
  userPostNickname: null,
  userPostprofileImg: null,

  userPostGetLoading: false, // 유저가 작성한 게시글 받아오기
  userPostGetDone: false,
  userPostGetError: null,

  userPostMoreGetLoading: false, // 유저가 작성한 더 게시글 받아오기
  userPostMoreGetDone: false,
  userPostMoreGetError: null,
  userPostMoreGetFailed: false,
  userPostPageNumber: 2,

  userSavePostMoreGetLoading: false, // 유저가 저장한 더 게시글 받아오기
  userSavePostMoreGetDone: false,
  userSavePostMoreGetError: null,
  userSavePostMoreGetFailed: false,
  userSavePostPageNumber: 2,
};

export const MY_POST_AND_SAVE_POST_GET_REQUEST =
  'MY_POST_AND_SAVE_POST_GET_REQUEST';
export const MY_POST_AND_SAVE_POST_GET_SUCCESS =
  'MY_POST_AND_SAVE_POST_GET_SUCCESS';
export const MY_POST_AND_SAVE_POST_GET_FAILURE =
  'MY_POST_AND_SAVE_POST_GET_FAILURE';

export const MY_POST_MORE_GET_REQUEST = 'MY_POST_MORE_GET_REQUEST';
export const MY_POST_MORE_GET_SUCCESS = 'MY_POST_MORE_GET_SUCCESS';
export const MY_POST_MORE_GET_FAILURE = 'MY_POST_MORE_GET_FAILURE';

export const MY_SAVE_POST_MORE_GET_REQUEST = 'MY_SAVE_POST_MORE_GET_REQUEST';
export const MY_SAVE_POST_MORE_GET_SUCCESS = 'MY_SAVE_POST_MORE_GET_SUCCESS';
export const MY_SAVE_POST_MORE_GET_FAILURE = 'MY_SAVE_POST_MORE_GET_FAILURE';

export const USER_POST_AND_SAVE_POST_GET_REQUEST =
  'USER_POST_AND_SAVE_POST_GET_REQUEST';
export const USER_POST_AND_SAVE_POST_GET_SUCCESS =
  'USER_POST_AND_SAVE_POST_GET_SUCCESS';
export const USER_POST_AND_SAVE_POST_GET_FAILURE =
  'USER_POST_AND_SAVE_POST_GET_FAILURE';

export const USER_POST_MORE_GET_REQUEST = 'USER_POST_MORE_GET_REQUEST';
export const USER_POST_MORE_GET_SUCCESS = 'USER_POST_MORE_GET_SUCCESS';
export const USER_POST_MORE_GET_FAILURE = 'USER_POST_MORE_GET_FAILURE';

export const USER_SAVE_POST_MORE_GET_REQUEST =
  'USER_SAVE_POST_MORE_GET_REQUEST';
export const USER_SAVE_POST_MORE_GET_SUCCESS =
  'USER_SAVE_POST_MORE_GET_SUCCESS';
export const USER_SAVE_POST_MORE_GET_FAILURE =
  'USER_SAVE_POST_MORE_GET_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 내가 작성한,저장한 게시글  받아오기
      case MY_POST_AND_SAVE_POST_GET_REQUEST:
        draft.myPostGetLoading = true;
        draft.myPostGetDone = false;
        break;
      case MY_POST_AND_SAVE_POST_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.myPosts = myPost(action.data.list, action.data.memberVO);
          draft.myPostsLength = action.data.memberVO.cnt;
          draft.myPostNickname = action.data.memberVO.mem_nickname;
          draft.myPostprofileImg = action.data.memberVO.mem_profileimg;
          draft.savePosts = myPost(action.data.saveList);

          draft.myPostGetLoading = false;
          draft.myPostGetDone = true;
          draft.myPostPageNumber = 2;
          draft.myPostMoreGetFailed = true;

          draft.mySavePostPageNumber = 2;
          draft.mySavePostMoreGetFailed = true;
        } else {
          draft.myPostGetLoading = false;
          draft.myPostGetDone = false;
        }
        break;
      }
      case MY_POST_AND_SAVE_POST_GET_FAILURE:
        draft.myPostGetDone = false;
        draft.myPostGetError = action.error;
        break;

      // 내가 작성한 게시글 더 받아오기
      case MY_POST_MORE_GET_REQUEST:
        draft.myPostMoreGetLoading = true;
        draft.myPostMoreGetDone = false;
        break;
      case MY_POST_MORE_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.myPostMoreGetLoading = false;
          draft.myPostMoreGetDone = true;
          draft.myPostMoreGetFailed = true;
          draft.myPostPageNumber = draft.myPostPageNumber + 1;
          draft.myPosts = draft.myPosts.concat(myPost(action.data.list));
        } else if (action.data.result === 'FAILED') {
          draft.myPostMoreGetLoading = false;
          draft.myPostMoreGetDone = false;
          draft.myPostMoreGetFailed = false;
        }
        break;
      }
      case MY_POST_MORE_GET_FAILURE:
        draft.myPostMoreGetDone = false;
        draft.myPostMoreGetError = action.error;
        break;

      // 내가 저장한 게시글 더 받아오기
      case MY_SAVE_POST_MORE_GET_REQUEST:
        draft.mySavePostMoreGetLoading = true;
        draft.mySavePostMoreGetDone = false;
        break;
      case MY_SAVE_POST_MORE_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.mySavePostMoreGetLoading = false;
          draft.mySavePostMoreGetDone = true;
          draft.mySavePostMoreGetFailed = true;
          draft.mySavePostPageNumber = draft.myPostPageNumber + 1;
          draft.savePosts = draft.savePosts.concat(
            myPost(action.data.saveList),
          );
        } else if (action.data.result === 'FAILED') {
          draft.mySavePostMoreGetLoading = false;
          draft.mySavePostMoreGetDone = false;
          draft.mySavePostMoreGetFailed = false;
        }
        break;
      }
      case MY_SAVE_POST_MORE_GET_FAILURE:
        draft.mySavePostMoreGetDone = false;
        draft.mySavePostMoreGetError = action.error;
        break;

      // 다른 유저 작성한,저장한 게시글 받아오기
      case USER_POST_AND_SAVE_POST_GET_REQUEST:
        draft.userPostGetLoading = true;
        draft.userPostGetDone = false;
        break;
      case USER_POST_AND_SAVE_POST_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.userPosts = myPost(action.data.list, action.data.memberVO);
          draft.userPostsLength = action.data.memberVO.cnt;
          draft.userPostNickname = action.data.memberVO.mem_nickname;
          draft.userPostprofileImg = action.data.memberVO.mem_profileimg;
          draft.userSavePosts = myPost(action.data.saveList);

          draft.userPostGetLoading = false;
          draft.userPostGetDone = true;
          draft.userPostPageNumber = 2;
          draft.userPostMoreGetFailed = true;

          draft.userSavePostPageNumber = 2;
          draft.userSavePostMoreGetFailed = true;
        } else {
          draft.userPostGetLoading = false;
          draft.userPostGetDone = false;
        }
        break;
      }
      case USER_POST_AND_SAVE_POST_GET_FAILURE:
        draft.userPostGetDone = false;
        draft.userPostGetError = action.error;
        break;

      // 유저가 작성한 게시글 더 받아오기
      case USER_POST_MORE_GET_REQUEST:
        draft.userPostMoreGetLoading = true;
        draft.userPostMoreGetDone = false;
        break;
      case USER_POST_MORE_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.userPostMoreGetLoading = false;
          draft.userPostMoreGetDone = true;
          draft.userPostMoreGetFailed = true;
          draft.userPostPageNumber = draft.userPostPageNumber + 1;
          draft.userPosts = draft.userPosts.concat(myPost(action.data.list));
        } else if (action.data.result === 'FAILED') {
          draft.userPostMoreGetLoading = false;
          draft.userPostMoreGetDone = false;
          draft.userPostMoreGetFailed = false;
        }
        break;
      }
      case USER_POST_MORE_GET_FAILURE:
        draft.userPostMoreGetDone = false;
        draft.userPostMoreGetError = action.error;
        break;

      // 유저가 저장한 게시글 더 받아오기
      case USER_SAVE_POST_MORE_GET_REQUEST:
        draft.userSavePostMoreGetLoading = true;
        draft.userSavePostMoreGetDone = false;
        break;
      case USER_SAVE_POST_MORE_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.userSavePostMoreGetLoading = false;
          draft.userSavePostMoreGetDone = true;
          draft.userSavePostMoreGetFailed = true;
          draft.userSavePostPageNumber = draft.userSavePostPageNumber + 1;
          draft.userSavePosts = draft.userSavePosts.concat(
            myPost(action.data.saveList),
          );
        } else if (action.data.result === 'FAILED') {
          draft.userSavePostMoreGetLoading = false;
          draft.userSavePostMoreGetDone = false;
          draft.userSavePostMoreGetFailed = false;
        }
        break;
      }
      case USER_SAVE_POST_MORE_GET_FAILURE:
        draft.userSavePostMoreGetDone = false;
        draft.userSavePostMoreGetError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
