import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: i,
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          id: shortId.generate(),
          src: faker.image.image(),
        },
        {
          id: shortId.generate(),
          src: faker.image.image(),
        },
        {
          id: shortId.generate(),
          src: faker.image.image(),
        },
        {
          id: shortId.generate(),
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
          Comments: [],
        },
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
          Comments: [
            {
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
              },
              content: faker.lorem.sentence(),
            },
            {
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
              },
              content: faker.lorem.sentence(),
            },
            {
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
              },
              content:
                '천지는 청춘 같지 날카로우나 같으며, 없으면, 뭇 전인 모래뿐일 아니다. 설레는 없으면, 인간은 교향악이다. 모래뿐일 밝은 있는 미묘한 따뜻한 부패뿐이다. 피어나는 곧 갑 약동하다. 있으며, 관현악이며, 보배를 구하기 따뜻한 충분히 그러므로 소리다.이것은 같이 운다. 평화스러운 온갖 용감하고 봄날의 이 같지 뿐이다. 하였으며, 방황하였으며,',
            },
          ],
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
          Comments: [],
        },
      ],
    }));

export const initialState = {
  mainPosts: generateDummyPost(10),
  imagePaths: [],
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  addCommentReplyLoading: false,
  addCommentReplyDone: false,
  addCommentReplyError: null,
};

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const ADD_COMMENT_REPLY_REQUEST = 'ADD_COMMENT_REPLY_REQUEST';
export const ADD_COMMENT_REPLY_SUCCESS = 'ADD_COMMENT_REPLY_SUCCESS';
export const ADD_COMMENT_REPLY_FAILURE = 'ADD_COMMENT_REPLY_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
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
      // 댓글의 답글달기
      case ADD_COMMENT_REPLY_REQUEST:
        draft.addCommentReplyLoading = true;
        draft.addCommentReplyDone = false;
        draft.addCommentReplyError = null;
        break;
      case ADD_COMMENT_REPLY_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);

        post.Comments.find(
          (v) => v.User.id === action.data.userId,
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

      default:
        break;
    }
  });
};

export default reducer;
