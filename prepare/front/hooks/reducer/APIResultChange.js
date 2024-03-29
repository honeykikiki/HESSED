// getIdPost
export const boardOneViewPost = (list, commentList) => {
  return {
    id: list.bo_no,
    User: {
      id: list.bo_writer,
      nickname: list.mem_nickname,
      profileImg: list.mem_profileimg,
    },
    content: list.bo_content,
    liked: list.goodChk,
    saved: list.saveChk,
    Images: list.boardImgList.map((listImg) => {
      return {
        id: listImg.bo_img_no,
        bo_img_location: `${listImg.bo_img_location}`,
      };
    }),
    likedNumber: list.goodCnt,
    likeMember: list.goodNick,
    Comments: commentList.filter((commentList) => {
      return commentList.postId === list.bo_no;
    }),
    date: list.bo_date,
  };
};

// postMainAction
export const generateDummyPost = (
  list,
  listImg,
  goodList,
  saveList,
  commentList,
) => {
  return list.map((v) => ({
    id: v.bo_no,
    User: {
      id: v.bo_writer,
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.bo_content,
    Images: listImg.filter((listImg) => {
      if (v.bo_no === listImg.bo_no) {
        return {
          id: listImg.bo_img_no,
          url: `${listImg.bo_img_location}`,
        };
      }
    }),
    liked: goodList.filter((goodList) => {
      if (goodList.bo_no === v.bo_no) {
        return v.mem_id;
      }
    }),
    saved: saveList.filter((saveList) => {
      if (saveList.bo_no === v.bo_no) {
        return v.mem_id;
      }
    }),
    likedNumber: v.goodCnt,
    likeMember: v.goodNick,
    Comments: commentList.filter((commentList) => {
      return commentList.postId === v.bo_no;
    }),
    date: v.bo_date,
  }));
};

// postMainAction = commentList
export const postMainActionCommentList = (list) => {
  return list.map((v) => ({
    postId: v.bo_no,
    nickname: v.mem_nickname,
    comment: v.cmt_content,
  }));
};

// postMainAction =  memberList
export const dummyMemberList = (memberlist) => {
  return memberlist.map((v) => ({
    memberListId: v.mem_id,
    memberListNickname: v.mem_nickname,
    memberListprofileImg: v.mem_profileimg,
  }));
};

// userInfo
export const dummyUser = (data) => ({
  no: data.mem_no,
  id: data.mem_id,
  name: data.mem_name,
  nickname: data.mem_nickname,
  profileImg: data.mem_profileimg,
  grade: data.mem_grade,
});

// userPost
export const myPost = (list) =>
  list.map((v) => ({
    id: v.bo_no,
    Images: {
      imageCount: v.bo_img_count,
      image: v.bo_img_location,
    },
    postCount: v.boardCount,
    User: {
      id: v.mem_id,
    },
  }));

// 댓글
export const commentsList = (list, reply) => {
  return list.map((v) => ({
    postId: v.bo_no,
    commentId: v.cmt_no,
    User: {
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.cmt_content,
    date: v.cmt_date,
    depth: v.cmt_depth,
    Comments: reply.filter((replys) => replys.group === v.cmt_group),
  }));
};
// 답글
export const replyCommentsList = (list) => {
  return list.map((v) => ({
    postId: v.bo_no,
    commentId: v.cmt_no,
    User: {
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.cmt_content,
    date: v.cmt_date,
    depth: v.cmt_depth,
    group: v.cmt_group,
  }));
};

// 공지사항
export const noticeList = (list) => {
  return list.map((v) => ({
    noticeId: v.bo_no,
    title: v.bo_title,
    image: v.bo_image,
    content: v.bo_content,
    write: v.bo_writer,
    date: v.bo_date,
  }));
};
