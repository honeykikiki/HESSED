import produce from 'immer';

import {
  boardOneViewPost,
  dummyMemberList,
} from '../hooks/reducer/APIResultChange';
import {
  LIKE_POST_SUCCESS,
  SAVE_POST_SUCCESS,
  UNLIKE_POST_SUCCESS,
  UNSAVE_POST_SUCCESS,
} from './postMainAction';

export const initialState = {
  getIdPostLoading: false, // 특정 게시물 가져오기
  getIdPostDone: false,
  getIdPostError: null,

  getGoodListLoading: false, // 특정 게시물 좋아요 리스트 가져오기
  getGoodListDone: false,
  getGoodListError: null,

  boardOneViewPost: null,
  boardGoodListPost: [],
};

export const GET_ID_POST_REQUEST = 'GET_ID_POST_REQUEST';
export const GET_ID_POST_SUCCESS = 'GET_ID_POST_SUCCES';
export const GET_ID_POST_FAILURE = 'GET_ID_POST_FAILURE';

export const GET_GOOD_LIST_REQUEST = 'GET_GOOD_LIST_REQUEST';
export const GET_GOOD_LIST_SUCCESS = 'GET_GOOD_LIST_SUCCES';
export const GET_GOOD_LIST_FAILURE = 'GET_GOOD_LIST_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 특정 게시물 가져오기
      case GET_ID_POST_REQUEST:
        draft.getIdPostLoading = true;
        draft.getIdPostDone = false;
        draft.getIdPostError = null;
        break;
      case GET_ID_POST_SUCCESS:
        if (action.data.result === 'SUCCESS') {
          draft.getIdPostLoading = false;
          draft.getIdPostDone = true;
          draft.boardOneViewPost = boardOneViewPost(action.data.boardVO);
        } else if (action.data.result === 'NOTEXIST') {
          draft.getIdPostLoading = false;
          draft.getIdPostDone = false;
        } else {
          draft.getIdPostLoading = false;
          draft.getIdPostDone = false;
        }
        break;
      case GET_ID_POST_FAILURE:
        draft.getIdPostLoading = false;
        draft.getIdPostError = action.error;
        break;

      case SAVE_POST_SUCCESS:
        if (draft.boardOneViewPost) {
          draft.boardOneViewPost.saved = action.data.boardVO.mem_id;
        }
        break;
      case UNSAVE_POST_SUCCESS:
        if (draft.boardOneViewPost) {
          draft.boardOneViewPost.saved = null;
        }
        break;
      case LIKE_POST_SUCCESS:
        if (draft.boardOneViewPost) {
          draft.boardOneViewPost.liked = action.data.goodVO.mem_id;
          draft.boardOneViewPost.likedNumber += 1;
        }
        break;
      case UNLIKE_POST_SUCCESS:
        if (draft.boardOneViewPost) {
          draft.boardOneViewPost.liked = null;
          draft.boardOneViewPost.likedNumber -= 1;
        }
        break;

      // 특정 게시물 좋아요 리스트 가져오기
      case GET_GOOD_LIST_REQUEST:
        draft.getGoodListLoading = true;
        draft.getGoodListDone = false;
        draft.getGoodListError = null;
        break;
      case GET_GOOD_LIST_SUCCESS:
        if (action.data.result === 'OK') {
          draft.getGoodListLoading = false;
          draft.getGoodListDone = true;
          draft.boardGoodListPost = dummyMemberList(action.data.goodList);
        } else {
          draft.getGoodListLoading = false;
          draft.getGoodListDone = false;
        }
        break;
      case GET_GOOD_LIST_FAILURE:
        draft.getGoodListLoading = false;
        draft.getGoodListError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
