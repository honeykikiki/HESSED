import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import style from '../styles/css/mainPage.module.css';

import QrCode from './QrCode/QrCode';
import { POST_CARD, PROFILE, QR_CODE, UP_LOAD } from '../reducers/menu';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Router from 'next/router';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { postCard, upLoad, qrCode } = useSelector((state) => state.menu);

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
  }, [postCard]);
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

  const onLogOut = useCallback((data) => {
    dispatch({
      type: LOG_OUT_REQUEST,
      data,
    });
  }, []);
  const onProfile = useCallback(() => {
    Router.push('profile');
  }, []);
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
                          <img src="/icon/home-w.svg" />
                        ) : (
                          <img src="/icon/home-b.svg" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li onClick={upLoadClick}>
                    <Link href="/upload">
                      {/* UpLoad */}
                      <a>
                        {upLoad ? (
                          <img src="/icon/upLoad-w.svg" />
                        ) : (
                          <img src="/icon/upLoad-b.svg" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li onClick={qrCodeClick}>
                    {/* QrCode */}
                    <a>
                      {qrCode ? (
                        <img src="/icon/QR-b.svg" />
                      ) : (
                        <img src="/icon/QR-w.svg" />
                      )}
                    </a>
                  </li>

                  <li>
                    {/* profile */}
                    {/* <Link href="/profile"> */}
                    <a>
                      {/* {profile ? (
                        <div className={style.profileCircle}></div>
                      ) : null} */}
                      <div
                        style={{
                          borderRadius: '50%',
                          background: `url(/icon/profle_img.png) center`,
                          backgroundSize: `contain`,
                          height: '100%',
                        }}
                        onClick={profileClickToggle}
                      >
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
