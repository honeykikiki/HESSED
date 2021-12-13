import produce from 'immer';
import { myPost } from '../hooks/reducer/APIResultChange';
import { LOG_IN_SUCCESS } from './userInfo';

export const initialState = {
  myPosts: [],
  myPostsLength: null,
  savePosts: [],
  userPosts: [],

  myPostGetLoading: false, // 유저가 작성한 게시글 받아오기
  myPostGetDone: false,
  myPostGetError: null,

  myPostMoreGetLoading: false, // 유저가 작성한 더 게시글 받아오기
  myPostMoreGetDone: false,
  myPostMoreGetError: null,
  myPostMoreGetFailed: false,
  myPostPageNumber: 2,
  myPostNickname: null,
  myPostprofileImg: null,

  mySavePostGetLoading: false, // 유저가 저장한 게시글 받아오기
  mySavePostGetDone: false,
  mySavePostGetError: null,

  mySavePostMoreGetLoading: false, // 유저가 저장한 더 게시글 받아오기
  mySavePostMoreGetDone: false,
  mySavePostMoreGetError: null,
  mySavePostMoreGetFailed: false,
  mySavePostPageNumber: 2,
  mySavePostprofileImg: null,

  userPostGetLoading: false, // 유저가 작성한 게시글 받아오기
  userPostGetDone: false,
  userPostGetError: null,

  userPostMoreGetLoading: false, // 유저가 작성한 더 게시글 받아오기
  userPostMoreGetDone: false,
  userPostMoreGetError: null,
  userPostMoreGetFailed: false,
  userPostPageNumber: 2,
  userPostNickname: null,
  userPostprofileImg: null,
};

export const MY_POST_GET_REQUEST = 'MY_POST_GET_REQUEST';
export const MY_POST_GET_SUCCESS = 'MY_POST_GET_SUCCESS';
export const MY_POST_GET_FAILURE = 'MY_POST_GET_FAILURE';

export const MY_POST_MORE_GET_REQUEST = 'MY_POST_MORE_GET_REQUEST';
export const MY_POST_MORE_GET_SUCCESS = 'MY_POST_MORE_GET_SUCCESS';
export const MY_POST_MORE_GET_FAILURE = 'MY_POST_MORE_GET_FAILURE';

export const MY_SAVE_POST_GET_REQUEST = 'MY_SAVE_POST_GET_REQUEST';
export const MY_SAVE_POST_GET_SUCCESS = 'MY_SAVE_POST_GET_SUCCESS';
export const MY_SAVE_POST_GET_FAILURE = 'MY_SAVE_POST_GET_FAILURE';

export const MY_SAVE_POST_MORE_GET_REQUEST = 'MY_SAVE_POST_MORE_GET_REQUEST';
export const MY_SAVE_POST_MORE_GET_SUCCESS = 'MY_SAVE_POST_MORE_GET_SUCCESS';
export const MY_SAVE_POST_MORE_GET_FAILURE = 'MY_SAVE_POST_MORE_GET_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 유저가 작성한 게시글 받아오기
      case (MY_POST_GET_REQUEST, MY_SAVE_POST_GET_REQUEST):
        draft.myPostGetLoading = true;
        draft.myPostGetDone = false;
        draft.userPostGetLoading = true;

        break;
      case (MY_POST_GET_SUCCESS, MY_SAVE_POST_GET_SUCCESS): {
        if (action.data.result === 'SUCCESS') {
          if (action.data.list[0].mem_id === action.data.memberVO.mem_id) {
            draft.myPosts = myPost(action.data.list, action.data.memberVO);
            draft.myPostsLength = action.data.memberVO.cnt;
            draft.myPostNickname = action.data.memberVO.mem_nickname;
            draft.myPostprofileImg = action.data.memberVO.mem_profileimg;
            // draft.myPostGetLoading = false;
            draft.myPostGetDone = true;
            draft.myPostPageNumber = 2;
            draft.myPostMoreGetFailed = true;
            draft.mySavePostPageNumber = 2;
            draft.savePosts = myPost(action.data.saveList);
            draft.mySavePostMoreGetFailed = true;
          } else {
            draft.userPosts = myPost(action.data.list, action.data.memberVO);
            // draft.userPostGetLoading = false;

            draft.userPostGetDone = false;
            draft.userPostGetError = null;

            draft.userPostMoreGetLoading = false;
            draft.userPostMoreGetDone = false;
            draft.userPostMoreGetError = null;
            draft.userPostMoreGetFailed = false;
            draft.userPostPageNumber = 2;
            draft.userPostNickname = null;
            draft.userPostprofileImg = null;
          }
        } else {
          draft.myPostGetLoading = false;
          draft.myPostGetDone = false;
        }
        break;
      }
      case (MY_POST_GET_FAILURE, MY_SAVE_POST_GET_FAILURE):
        draft.myPostGetDone = false;
        draft.myPostGetError = action.error;
        break;

      // 유저가 작성한 게시글 더 받아오기
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

      // 유저가 작성한 게시글 더 받아오기
      case MY_SAVE_POST_MORE_GET_REQUEST:
        draft.myPostMoreGetLoading = true;
        draft.myPostMoreGetDone = false;
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

      default:
        break;
    }
  });
};

export default reducer;
