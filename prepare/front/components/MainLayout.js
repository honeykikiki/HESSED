import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import style from '../styles/css/mainPage.module.css';

import QrCode from './QrCode/QrCode';
import { POST_CARD, PROFILE, QR_CODE, UP_LOAD } from '../reducers/menu';

import Router from 'next/router';

import { baseURL } from '../config/config';
import { LOAD_POSTS_REQUEST } from '../reducers/postMainAction';
import { MY_POST_AND_SAVE_POST_GET_REQUEST } from '../reducers/userPost';
import { LOG_OUT_REQUEST } from '../reducers/userInfo';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { postCard, upLoad, qrCode, profile } = useSelector(
    (state) => state.menu,
  );
  const { me } = useSelector((state) => state.userInfo);
  const { myPosts, savePosts } = useSelector((state) => state.userPost);

  const [profileToggle, setProfileToggle] = useState(false);

  const profileClickToggle = useCallback((data) => {
    setProfileToggle((prev) => !prev);
    dispatch({
      type: PROFILE,
    });
  }, []);

  const postCardClick = useCallback(() => {
    dispatch({
      type: POST_CARD,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { mem_id: me.id },
    });
  }, [postCard, me]);
  const upLoadClick = useCallback(() => {
    dispatch({
      type: UP_LOAD,
    });
  }, [upLoad]);
  const qrCodeClick = useCallback(() => {
    dispatch({
      type: QR_CODE,
    });
  }, [qrCode]);

  const onLogOut = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  const onProfile = useCallback(() => {
    Router.push('/profile');
    if (me) {
      dispatch({
        type: MY_POST_AND_SAVE_POST_GET_REQUEST,
        data: { mem_id: me.id },
      });
    }
  }, [me]);
  return (
    <>
      <div className={style.wrapper}>
        <header id={style.header}>
          <div className={style.maxWidth}>
            <div className={style.logo}>
              <Link href="/">
                <a>
                  <h1></h1>
                </a>
              </Link>
            </div>
            <nav id={style.gnb}>
              <div>
                <ul>
                  <li onClick={postCardClick}>
                    <Link href="/">
                      {/* Postcard */}
                      <a>
                        {postCard ? (
                          <img src="/icon/home-B.svg" alt="Posticon" />
                        ) : (
                          <img src="/icon/home-W.svg" alt="Posticon" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li onClick={upLoadClick}>
                    <Link href="/upload">
                      {/* UpLoad */}
                      <a>
                        {upLoad ? (
                          <img src="/icon/upLoad-B.svg" alt="upLoadicon" />
                        ) : (
                          <img src="/icon/upLoad-W.svg" alt="upLoadicon" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li onClick={qrCodeClick}>
                    {/* QrCode */}
                    <a>
                      {qrCode ? (
                        <img src="/icon/QR-W.svg" alt="qrCodeicon" />
                      ) : (
                        <img src="/icon/QR-B.svg" alt="qrCodeicon" />
                      )}
                    </a>
                  </li>

                  <li>
                    <a>
                      <div
                        className={style.profileimg}
                        onClick={profileClickToggle}
                      >
                        {me?.profileImg?.url ? (
                          <img
                            src={`${baseURL}/${me.profileImg}`}
                            alt="profileImg"
                          />
                        ) : (
                          <img src="/icon/profileBasic.svg" alt="profileImg" />
                        )}

                        {/* {me.profileImg ? (
                          <img
                            src={`${baseURL}/${me.profileImg}`}
                            className={style.circle}
                            alt="profileImg"
                          />
                        ) : null} */}
                        {profileToggle ? (
                          <div className={style.profileBox}>
                            <div>
                              <span></span>
                              <div onClick={onProfile}>프로필</div>
                              <div onClick={onLogOut}>로그아웃</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </a>
                    {/* </Link> */}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <section>{children}</section>
        <section>
          <QrCode />
        </section>
      </div>
    </>
  );
};

export default MainLayout;
