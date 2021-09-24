import produce from 'immer';
import faker from 'faker';
import shortId from 'shortid';

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((v, i) => ({
      id: shortId.generate(),
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
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const initialState = {
  mainPosts: generateDummyPost(10),
  imagePaths: [],
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
