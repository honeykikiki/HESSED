const mainposts = [
  {
    id,
    User: {
      id,
      nickname,
    },
    content,
    Images: [],
    liked,

    Comments: [
      {
        postId,
        commentId,
        User: {
          id,
          nickname,
        },
        content,
        Comments: [
          {
            postId,
            commentId,
            commentReplyId,
            User: {
              id,
              nickname,
            },
            content,
          },
        ],
      },
    ],
  },
];

const me = {
  myName,
  id,
  nickname,
  area,
  phonenumber,
  liked: [],
  saved: [],
  mypost: [],
};
