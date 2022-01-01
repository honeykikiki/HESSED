// getIdPost
export const boardOneViewPost = (list) => {
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
    Comments: [],
    date: list.bo_date,
  };
};

// postMainAction
export const generateDummyPost = (list, listImg, goodList, saveList) => {
  return list.map((v, i) => ({
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
    Comments: [],
    date: v.bo_date,
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

export const commentsList = (list) =>
  list.map((v) => ({
    postId: v.bo_no,
    commentId: v.cmt_no,
    User: {
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.cmt_content,
    date: v.cmt_date,
    depth: v.cmt_depth,
    Comments: [],
  }));
