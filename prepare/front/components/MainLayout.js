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
                    <Link href="">
                      <a></a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a></a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a></a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a></a>
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
