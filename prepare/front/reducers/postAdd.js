import produce from 'immer';

export const initialState = {
  addPostLoading: false, // 게시물 등록
  addPostDone: false,
  addPostError: null,
  removePostLoading: false, // 게시물 삭제
  removePostDone: false,
  removePostError: null,

  postCompleat: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const PAGE_CHANGE = 'PAGE_CHANGE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 게시물 등록
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS: {
        if (action.data.result === 'OK') {
          draft.addPostLoading = false;
          draft.addPostDone = true;
          draft.postCompleat = true;
        } else {
          draft.addPostLoading = false;
          draft.addPostDone = false;
          draft.postCompleat = false;
        }

        break;
      }
      case ADD_POST_FAILURE:
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;

      // 게시물 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostDone = false;
        draft.removePostError = action.error;
        break;

      case PAGE_CHANGE:
        draft.postCompleat = false;
        break;

      default:
        break;
    }
  });
};

export default reducer;
