import produce from 'immer';

export const initialState = {
  postCard: true, // 로그인 시도중
  upLoad: false,
  qrCode: true,
  profile: false,
  commentToReply: true,
  loading: true,
};
export const LOADING = 'LOADING';

export const POST_CARD = 'POST_CARD';
export const UP_LOAD = 'UP_LOAD';
export const QR_CODE = 'QR_CODE';
export const PROFILE = 'PROFILE';

export const COMMENT_TO_REPLY_OPEN = 'COMMENT_TO_REPLY_OPEN';
export const COMMENT_TO_REPLY_CLOSE = 'COMMENT_TO_REPLY_CLOSE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOADING:
        draft.loading = false;
        break;
      case POST_CARD:
        draft.postCard = true;
        draft.upLoad = false;
        draft.qrCode = true;
        draft.profile = false;
        break;
      case UP_LOAD:
        draft.postCard = false;
        draft.upLoad = true;
        draft.qrCode = true;
        draft.profile = false;
        break;
      case QR_CODE:
        draft.postCard = false;
        draft.upLoad = false;
        draft.qrCode = false;
        draft.profile = false;
        break;
      case PROFILE:
        draft.postCard = false;
        draft.upLoad = false;
        draft.qrCode = true;
        draft.profile = true;
        break;

      case COMMENT_TO_REPLY_CLOSE:
        draft.commentToReply = true;
        break;
      case COMMENT_TO_REPLY_OPEN:
        draft.commentToReply = false;
        break;
      default:
        break;
    }
  });
};
export default reducer;
