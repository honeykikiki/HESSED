// 게시글 요청할떄 보내는 데이터 (자기가 올린 게시물은 뺴고)
const data = lastId;

// 게시글 요청할떄 받는 데이터 (자기가 올린 게시물은 뺴고)
const result = 
  {
    id : Number, // 게시글 넘버
    content : String, // 게시글 내용
    User: {
      no : String,
      nickname : String,
    }, // 게시글 작성자
    notice: Boolean, // 게시글 공지여부
    date : String, // 게시글 작성일
    likers: [],
    images: [],
    comments: [],
  },
;

// // 프로필 요청할떄 보내는 데이터 
// const data = lastId;
// // 프로필 요청할떄 받는 데이터 
// const result = 
//   {
//     id, // 게시글 넘버
//     content, // 게시글 내용
//     User: {
//       id,
//       nickname,
//     }, // 게시글 작성자
//     notice, // 게시글 공지여부
//     date, // 게시글 작성일
//     likers: [],
//     images: [],
//     comments: [],
//   },
// ;

// 로그인할떄 보내는 데이터
const data = {
  MEN_ID,
  MEN_PW,
};
// 로그인할떄 받는 데이터
const result = {
  no : number, // 회원번호
  id : String, // 회원아이디
  name : String, // 회원이름
  nickName : String, // 회원닉네임
  profileImg : null, // 회원닉네임
  grade, // 회원등급
  myPost: [], // 20개씩 불러오기
  savePosts: [], // 20개씩 불러오기
};

// 아이디찾기 보내는 데이터
const data = {
  MEN_NAME: String,
};
// 아이디찾기 받는 데이터
const result = {
  MEN_ID : String
};

// 비밀번호 보내는 데이터
const data = {
  MEN_NAME : String,
  MEN_ID : String,
};
// 비밀번호 받는 데이터
const result = {
  MEN_ID : String,
  MEN_PW : String,
};

// 회원가입할떄 보내는 데이터
const data = {
  MEM_ID : String,
  MEM_PW : String,
  MEM_NAME: String,
  MEM_NICKNAME: String,
  agree : Boolean,
};
// 회원가입할떄 받는 데이터



//  -------------------------------------------------------------------------
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
