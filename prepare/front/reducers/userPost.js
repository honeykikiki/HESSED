import produce from 'immer';

export const initialState = {
  myPosts: [],
  myPostsLength: null,
  savePosts: [],

  myPostGetLoading: false, // 유저가 작성한 게시글 받아오기
  myPostGetDone: false,
  myPostGetError: null,

  myPostMoreGetLoading: false, // 유저가 작성한 더 게시글 받아오기
  myPostMoreGetDone: false,
  myPostMoreGetError: null,
  myPostMoreGetFailed: true,
  myPostPageNumber: 2,
  myPostNickname: null,
  myPostprofileImg: null,
};

export const myPost = (list) =>
  list.map((v, id) => ({
    id: v.bo_no,
    Images: v.bo_img_location,
    postCount: v.boardCount,
    User: {
      id: v.mem_id,
    },
  }));

export const MY_POST_GET_REQUEST = 'MY_POST_GET_REQUEST';
export const MY_POST_GET_SUCCESS = 'MY_POST_GET_SUCCESS';
export const MY_POST_GET_FAILURE = 'MY_POST_GET_FAILURE';

export const MY_POST_MORE_GET_REQUEST = 'MY_POST_MORE_GET_REQUEST';
export const MY_POST_MORE_GET_SUCCESS = 'MY_POST_MORE_GET_SUCCESS';
export const MY_POST_MORE_GET_FAILURE = 'MY_POST_MORE_GET_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 유저가 작성한 게시글 받아오기
      case MY_POST_GET_REQUEST:
        draft.myPostGetLoading = true;
        draft.myPostGetDone = false;
        break;
      case MY_POST_GET_SUCCESS: {
        if (action.data.result === 'SUCCESS') {
          draft.myPostGetLoading = false;
          draft.myPostGetDone = true;
          draft.myPosts = myPost(action.data.list, action.data.memberVO);
          draft.myPostsLength = action.data.memberVO.cnt;
          draft.myPostPageNumber = 2;
          draft.myPostNickname = action.data.memberVO.mem_nickname;
          draft.myPostprofileImg = action.data.memberVO.mem_profileimg;
        } else {
          draft.myPostGetLoading = false;
          draft.myPostGetDone = false;
        }
        break;
      }
      case MY_POST_GET_FAILURE:
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

      default:
        break;
    }
  });
};

export default reducer;
