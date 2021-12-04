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
    Images: list.boardImgList.map((listImg) => {
      return {
        id: listImg.bo_img_no,
        bo_img_location: `${listImg.bo_img_location}`,
      };
    }),
    Comments: [],
    date: list.bo_date,
  };
};

// postMainAction
export const generateDummyPost = (list, listImg) =>
  list.map((v, i) => ({
    id: v.bo_no,
    User: {
      id: v.bo_writer,
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.bo_content,
    Likers: [],
    Images: listImg.filter((listImg) => {
      if (v.bo_no === listImg.bo_no) {
        return {
          id: listImg.bo_img_no,
          url: `${listImg.bo_img_location}`,
        };
      }
    }),
    liked: { id: v.goodChk },
    saved: { id: v.saveChk },
    likedNumber: v.goodCnt,
    Comments: [],
    date: v.bo_date,
  }));

// userInfo
export const dummyUser = (data) => ({
  no: data.mem_no,
  id: data.mem_id,
  name: data.mem_name,
  nickname: data.mem_nickname,
  profileImg: data.mem_profileimg,
  grade: data.mem_grade,
  Saved: [],
});

// userPost
export const myPost = (list) =>
  list.map((v, id) => ({
    id: v.bo_no,
    Images: v.bo_img_location,
    postCount: v.boardCount,
    User: {
      id: v.mem_id,
    },
  }));
