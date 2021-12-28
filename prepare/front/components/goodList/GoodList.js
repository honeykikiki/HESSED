import React from 'react';

import style from '../../styles/css/goodList.module.css';

const dummy = [
  {
    memberListId: 'jin@n.com',
    memberListNickname: '진',
    memberListprofileImg:
      '/img/profile/20211224/024401aa-d685-4009-9127-8bc97924fd46.jpg',
  },
];

const GoodList = () => {
  return (
    <>
      <div className={style.goodUserBox}>
        <ul className={style.goodUserInnerBox}>
          <li className={style.goodUser}>
            <div className={style.goodUserImg}>
              <img alt="profileImg" src="/icon/back.svg" />
            </div>
            <div className={style.goodUserNickname}>닉네임</div>
          </li>
          <li className={style.goodUser}>
            <div className={style.goodUserImg}>이미지</div>
            <div className={style.goodUserNickname}>닉네임</div>
          </li>
          <li className={style.goodUser}>
            <div className={style.goodUserImg}>이미지</div>
            <div className={style.goodUserNickname}>닉네임</div>
          </li>
          <li className={style.goodUser}>
            <div className={style.goodUserImg}>이미지</div>
            <div className={style.goodUserNickname}>닉네임</div>
          </li>
          <li className={style.goodUser}>
            <div className={style.goodUserImg}>이미지</div>
            <div className={style.goodUserNickname}>닉네임</div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GoodList;
