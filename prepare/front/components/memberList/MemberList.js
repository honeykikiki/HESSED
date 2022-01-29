/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import SwiperCore, { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

import style from '../../styles/css/memberlist.module.css';
import { baseURL } from '../../config/config';
import { USER_POST_AND_SAVE_POST_GET_REQUEST } from '../../reducers/userPost';

SwiperCore.use([FreeMode]);

const MemberList = () => {
  const dispatch = useDispatch();
  const { memberList } = useSelector((state) => state.postMainAction);
  const { me } = useSelector((state) => state.userInfo);
  const [windowScreenWidth, setWindowScreenWidth] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowScreenWidth(window.screen.width);
    }
  }, [window]);

  const getUserPost = useCallback((userId) => {
    dispatch({
      type: USER_POST_AND_SAVE_POST_GET_REQUEST,
      data: { mem_id: userId },
    });
  }, []);

  return (
    <>
      <div className={style.memberlistInnerBox}>
        <p className={style.hessedMemberNumber}>
          YOUTHHILLTOP FAMILY {memberList.length}명
        </p>

        {windowScreenWidth < 1025 ? (
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            freeMode
            className={style.memberlist}
          >
            {memberList.map((v) => {
              if (me.id === v.memberListId) {
                return;
              }
              return (
                <SwiperSlide
                  key={v.memberListId}
                  onClick={() => getUserPost(v.memberListId)}
                >
                  <div className={style.memberListImg}>
                    {v.memberListprofileImg ? (
                      <Link href={`/user/${v.memberListId}`}>
                        <a>
                          <img
                            src={`${baseURL}${v.memberListprofileImg}`}
                            alt="memberImg"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Link href={`/user/${v.memberListId}`}>
                        <a>
                          <img src="/icon/profileBasic.svg" alt="profileImg" />
                        </a>
                      </Link>
                    )}
                  </div>

                  <p>{v.memberListNickname}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Swiper
            slidesPerView={12}
            spaceBetween={30}
            freeMode
            className={style.memberlist}
          >
            {memberList.map((v) => {
              if (me.id === v.memberListId) {
                return;
              }
              return (
                <SwiperSlide
                  key={v.memberListId}
                  onClick={() => getUserPost(v.memberListId)}
                >
                  <div className={style.memberListImg}>
                    {v.memberListprofileImg ? (
                      <Link href={`/user/${v.memberListId}`}>
                        <a>
                          <img
                            src={`${baseURL}${v.memberListprofileImg}`}
                            alt="memberImg"
                          />
                        </a>
                      </Link>
                    ) : (
                      <Link href={`/user/${v.memberListId}`}>
                        <a>
                          <img src="/icon/profileBasic.svg" alt="profileImg" />
                        </a>
                      </Link>
                    )}
                  </div>

                  <p>{v.memberListNickname}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default MemberList;
