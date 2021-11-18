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
  const { postCard, upLoad, qrCode, profile } = useSelector(
    (state) => state.menu,
  );
  const { me } = useSelector((state) => state.user);

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

  const onLogOut = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  const onProfile = useCallback(() => {
    Router.push('/profile');
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
                        // style={{
                        //   background: `${
                        //     me.profileImg
                        //       ? `url(${me.profileImg?.url}) `
                        //       : `url(/icon/profileBasic.svg) `
                        //   } center`,
                        // }}
                        onClick={profileClickToggle}
                      >
                        {me?.profileImg ? (
                          <img src={me?.profileImg?.url} alt="profileImg" />
                        ) : (
                          <img src="/icon/profileBasic.svg" alt="profileImg" />
                        )}

                        {profile ? (
                          <img
                            src="/icon/profile.svg"
                            className={style.circle}
                            alt="profileImg"
                          />
                        ) : null}
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
