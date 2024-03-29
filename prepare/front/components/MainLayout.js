import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import style from '../styles/css/mainPage.module.css';

import QrCode from './QrCode/QrCode';
import { POST_CARD, PROFILE, QR_CODE, UP_LOAD } from '../reducers/menu';

import { baseURL } from '../config/config';
import { LOAD_POSTS_REQUEST } from '../reducers/postMainAction';
import { MY_POST_AND_SAVE_POST_GET_REQUEST } from '../reducers/userPost';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { postCard, upLoad, qrCode, profile } = useSelector(
    (state) => state.menu,
  );
  const { me } = useSelector((state) => state.userInfo);

  const postCardClick = useCallback(() => {
    dispatch({
      type: POST_CARD,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: { mem_id: me?.id },
    });
  }, [postCard, me]);
  const upLoadClick = useCallback(() => {
    dispatch({
      type: UP_LOAD,
    });
  }, [upLoad]);

  // const qrCodeClick = useCallback(() => {
  //   dispatch({
  //     type: QR_CODE,
  //   });
  // }, [qrCode]);

  const onProfile = useCallback(() => {
    if (me) {
      dispatch({
        type: MY_POST_AND_SAVE_POST_GET_REQUEST,
        data: { mem_id: me.id },
      });
    }
    dispatch({
      type: PROFILE,
    });
    Router.push('/profile');
  }, [me]);

  return (
    <>
      <div className={style.wrapper}>
        <header id={style.header}>
          <div className={style.maxWidth}>
            <div className={style.logo}>
              <h1>logo</h1>
            </div>
            <nav id={style.gnb}>
              <div>
                <ul>
                  <li onClick={postCardClick}>
                    <Link href="/">
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
                      <a>
                        {upLoad ? (
                          <img src="/icon/postAddOne.svg" alt="upLoadicon" />
                        ) : (
                          <img src="/icon/postAddTwo.svg" alt="upLoadicon" />
                        )}
                      </a>
                    </Link>
                  </li>

                  {/* <li onClick={qrCodeClick}>
                    <a>
                      {qrCode ? (
                        <img src="/icon/QR-W.svg" alt="qrCodeicon" />
                      ) : (
                        <img src="/icon/QR-B.svg" alt="qrCodeicon" />
                      )}
                    </a>
                  </li> */}

                  <li>
                    <a>
                      <div
                        className={style.profileimg}
                        // onClick={profileClickToggle}
                        onClick={onProfile}
                      >
                        <div className={style.profileImgBox}>
                          {me?.profileImg ? (
                            <img
                              src={`${baseURL}${me.profileImg}`}
                              alt="profileImg"
                            />
                          ) : (
                            <img
                              src="/icon/profileBasic.svg"
                              alt="profileImg"
                            />
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <section>{children}</section>
        {/* <section>
          <QrCode />
        </section> */}
      </div>
    </>
  );
};

export default MainLayout;
