import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: i,
      User: {
        id: 20,
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Likers: [],
      Images: [
        {
          id: shortId.generate(),
          url: faker.image.image(),
        },
        {
          id: shortId.generate(),
          url: faker.image.image(),
        },
        {
          id: shortId.generate(),
          url: faker.image.image(),
        },
        {
          id: shortId.generate(),
          url: faker.image.image(),
        },
      ],
      Comments: [],
    }));

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,

  addPostLoading: false, // 게시물 등록
  addPostDone: false,
  addPostError: null,
  removePostLoading: false, // 게시물 삭제
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false, // 댓글달기
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false, // 댓글 삭제
  removeCommentDone: false,
  removeCommentError: null,
  addCommentReplyLoading: false, // 댓글의 답글 달기
  addCommentReplyDone: false,
  addCommentReplyError: null,
  removeCommentReplyLoading: false, // 댓글의 답글 삭제
  removeCommentReplyDone: false,
  removeCommentReplyError: null,
  likePostLoading: false, // 좋아요
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false, // 좋아요 취소
  unLikePostDone: false,
  unLikePostError: null,
  loadPostsLoading: false, // 게시물 가져오기
  loadPostsDone: false,
  loadPostsError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const ADD_COMMENT_REPLY_REQUEST = 'ADD_COMMENT_REPLY_REQUEST';
export const ADD_COMMENT_REPLY_SUCCESS = 'ADD_COMMENT_REPLY_SUCCESS';
export const ADD_COMMENT_REPLY_FAILURE = 'ADD_COMMENT_REPLY_FAILURE';

export const REMOVE_COMMENT_REPLY_REQUEST = 'REMOVE_COMMENT_REPLY_REQUEST';
export const REMOVE_COMMENT_REPLY_SUCCESS = 'REMOVE_COMMENT_REPLY_SUCCESS';
export const REMOVE_COMMENT_REPLY_FAILURE = 'REMOVE_COMMENT_REPLY_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCES';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        draft.mainPosts.unshift(action.data);
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
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.postId,
        );
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostDone = false;
        draft.removePostError = action.error;
        break;

      // 댓글달기
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.push(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;
      // 댓글 삭제
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        const postnum = draft.mainPosts.findIndex(
          (v) => v.id === action.data.postId,
        );
        draft.mainPosts[postnum].Comments = post.Comments.filter(
          (v) => v.commentId !== action.data.commentId,
        );
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        draft.removeCommentError = null;

        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentDone = false;
        draft.removeCommentError = action.error;
        break;

      // 댓글의 답글달기
      case ADD_COMMENT_REPLY_REQUEST:
        draft.addCommentReplyLoading = true;
        draft.addCommentReplyDone = false;
        draft.addCommentReplyError = null;
        break;
      case ADD_COMMENT_REPLY_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.find(
          (v) => v.commentId === action.data.commentId,
        ).Comments.push(action.data);

        draft.addCommentReplyLoading = false;
        draft.addCommentReplyDone = true;
        draft.addCommentReplyError = null;
        break;
      }
      case ADD_COMMENT_REPLY_FAILURE:
        draft.addCommentReplyDone = false;
        draft.addCommentReplyError = action.error;
        break;
      // 댓글의 답글 삭제
      case REMOVE_COMMENT_REPLY_REQUEST:
        draft.removeCommentReplyLoading = true;
        draft.removeCommentReplyDone = false;
        draft.removeCommentReplyError = null;
        break;
      case REMOVE_COMMENT_REPLY_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        const postNum = draft.mainPosts.findIndex(
          (v) => v.id === action.data.postId,
        );
        const postCommentNum = post.Comments.findIndex(
          (v) => v.commentId === action.data.commentId,
        );
        draft.mainPosts[postNum].Comments[postCommentNum].Comments =
          post.Comments[postCommentNum].Comments.filter(
            (v) => v.commentReplyId !== action.data.commentReplyId,
          );
        draft.removeCommentReplyLoading = false;
        draft.removeCommentReplyDone = true;
        draft.removeCommentReplyError = null;
        break;
      }
      case REMOVE_COMMENT_REPLY_FAILURE:
        draft.removeCommentReplyDone = false;
        draft.removeCommentReplyError = action.error;
        break;

      // 좋아요
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        if (post) {
          post.Likers.push({ id: action.data.userId });
        }
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostError = null;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;
      // 좋아요 취소
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        if (post) {
          post.Likers = post.Likers.filter((v) => v.id !== action.data.userId);
        }
        draft.unLikePostLoading = false;
        draft.unLikePostDone = true;
        draft.unLikePostError = null;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unLikePostDone = false;
        draft.unLikePostError = action.error;
        break;

      // 게시물 가져오기
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        // draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.mainPosts = draft.mainPosts.concat(generateDummyPost(10));
        // draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
