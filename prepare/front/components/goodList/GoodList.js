import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { baseURL } from '../../config/config';
import style from '../../styles/css/goodList.module.css';
import {
  MY_POST_AND_SAVE_POST_GET_REQUEST,
  USER_POST_AND_SAVE_POST_GET_REQUEST,
} from '../../reducers/userPost';
import { PROFILE } from '../../reducers/menu';

const GoodList = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const { boardGoodListPost } = useSelector((state) => state.getIdPost);

  const getUserPost = useCallback(
    (memberId) => () => {
      dispatch({
        type: USER_POST_AND_SAVE_POST_GET_REQUEST,
        data: { mem_id: memberId },
      });
    },
    [],
  );

  const getMyPost = useCallback(() => {
    dispatch({
      type: MY_POST_AND_SAVE_POST_GET_REQUEST,
      data: { mem_id: me?.id },
    });
    dispatch({
      type: PROFILE,
    });
  }, [me]);
  return (
    <>
      <div className={style.goodUserBox}>
        <ul className={style.goodUserInnerBox}>
          {boardGoodListPost.map((v) => {
            if (v.memberListId === me.id) {
              return (
                <li className={style.goodUser} onClick={getMyPost}>
                  <Link href="/profile">
                    <a>
                      <div className={style.goodUserImg}>
                        <img
                          alt="profileImg"
                          src={`${baseURL}${v.memberListprofileImg}`}
                        />
                      </div>

                      <div className={style.goodUserNickname}>
                        {v.memberListNickname}
                      </div>
                    </a>
                  </Link>
                </li>
              );
            }
            return (
              <li
                className={style.goodUser}
                onClick={getUserPost(v.memberListId)}
              >
                <Link href={`/user/${v.memberListId}`}>
                  <a>
                    <div className={style.goodUserImg}>
                      <img
                        alt="profileImg"
                        src={`${baseURL}${v.memberListprofileImg}`}
                      />
                    </div>

                    <div className={style.goodUserNickname}>
                      {v.memberListNickname}
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default GoodList;
