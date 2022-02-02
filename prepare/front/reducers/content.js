import produce from 'immer';
import { noticeList } from '../hooks/reducer/APIResultChange';

export const initialState = {
  noticeLoadings: false,
  noticeDone: false,
  noticeError: null,

  notice: [],
};

export const GET_NOTICE_REQUEST = 'GET_NOTICE_REQUEST';
export const GET_NOTICE_SUCCESS = 'GET_NOTICE_SUCCESS';
export const GET_NOTICE_FAILURE = 'GET_NOTICE_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_NOTICE_REQUEST:
        draft.noticeLoadings = true;
        draft.noticeDone = false;
        break;
      case GET_NOTICE_SUCCESS:
        if (action.data.result === 'SUCCESS') {
          draft.noticeLoadings = false;
          draft.noticeDone = true;
          draft.notice = noticeList(action.data.noticeList);
        } else {
          draft.noticeLoadings = false;
          draft.noticeDone = false;
        }
        break;
      case GET_NOTICE_FAILURE:
        draft.noticeLoadings = false;
        draft.noticeDone = false;
        draft.noticeError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
