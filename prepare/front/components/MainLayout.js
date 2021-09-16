import React from 'react';
import Link from 'next/link';

import style from '../styles/css/mainPage.module.css';

const MainLayout = ({ children }) => {
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
                        {true ? <img src="/icon/home-w.svg" /> : <img src="/icon/home-b.svg" />}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/upload">
                      {/* UpLoad */}
                      <a>
                        {false ? (
                          <img src="/icon/upLoad-w.svg" />
                        ) : (
                          <img src="/icon/upLoad-b.svg" />
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      {/* QrCode */}

                      <a>{false ? <img src="/icon/QR-w.svg" /> : <img src="/icon/QR-b.svg" />}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      {/* profile */}
                      <a>
                        <div style={{ borderRadius: '50%', background: 'gray' }}></div>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
