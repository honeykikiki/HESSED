import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import style from '../styles/css/mainPage.module.css';

import QrCode from './QrCode/QrCode';

const MainLayout = ({ children }) => {
  const [postCardOnClick, setPostCardOnClick] = useState(true);
  const [upLoadCardOnClick, setUpLoadCardOnClick] = useState(false);

  const [upLoadCardOnClick, setUpLoadCardOnClick] = useState(false);

  return (
    <>
      <div className={style.wrapper}>
        <header id={style.header}>
          <div className={style.maxWidth}>
            <div className={style.logo}>
              <h1></h1>
            </div>
            <nav id={style.gnb}>
              <div>
                <ul>
                  <li>
                    <Link href="/">
                      {/* Postcard */}
                      <a>
                        {postCardOnClick ? (
                          <img src="/icon/home-w.svg" />
                        ) : (
                          <img src="/icon/home-b.svg" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/upload">
                      {/* UpLoad */}
                      <a>
                        {upLoadCardOnClick ? (
                          <img src="/icon/upLoad-w.svg" />
                        ) : (
                          <img src="/icon/upLoad-b.svg" />
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    {/* QrCode */}
                    <a>
                      {true ? (
                        <img src="/icon/QR-b.svg" />
                      ) : (
                        <img src="/icon/QR-w.svg" />
                      )}
                    </a>
                  </li>

                  <li>
                    <Link href="">
                      {/* profile */}
                      <a>
                        <div
                          style={{ borderRadius: '50%', background: 'gray' }}
                        ></div>
                      </a>
                    </Link>
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
