import produce from 'immer';

import { boardOneViewPost } from '../hooks/reducer/APIResultChange';

export const initialState = {
  getIdPostLoading: false, // 특정 게시물 가져오기
  getIdPostDone: false,
  getIdPostError: null,

  boardOneViewPost: null,
};

export const GET_ID_POST_REQUEST = 'GET_ID_POST_REQUEST';
export const GET_ID_POST_SUCCESS = 'GET_ID_POST_SUCCES';
export const GET_ID_POST_FAILURE = 'GET_ID_POST_FAILURE';

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
        console.log(action.data.boardVO, 'action.data.boardVO');
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

      default:
        break;
    }
  });
};

export default reducer;
