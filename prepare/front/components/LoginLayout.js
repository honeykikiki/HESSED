import React from 'react';
import Link from 'next/link';

import style from '../styles/css/loginLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={style.back}>
      <div className={style.maxWidth}>
        <div className={style.logoBox}>
          <Link href="/">
            <a>
              <h1 className={style.logo}>
                <img src="../public/HESSED_LOGO-W.png" alt={''} />
              </h1>
            </a>
          </Link>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
