const mainposts = [
  {
    BO_NO, // 게시글 넘버
    BO_CONTENT, // 게시글 내용
    BO_WRITER, // 게시글 작성자
    BO_NOTICE, // 게시글 공지여부
    BO_DATE, // 게시글 작성일
  },
];

const me = {
  MEM_NO, // 회원번호
  MEM_ID, // 회원아이디
  MEM_NAME, // 회원이름
  MEM_NICKNAME, // 회원닉네임
  MEM_GRADE, // 회원등급
};

const mainposts = [
  {
    id,
    User: {
      id,
      nickname,
    },
    content,
    Images: [],
    Likers,

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
  liked: [],
  saved: [],
  Followers: [],
  Followings: [],
};
