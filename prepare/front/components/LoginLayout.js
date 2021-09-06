import React from 'react';
import Link from 'next/link';

import styles from '../styles/css/loginLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.back}>
      <div className={styles.maxWidth}>
        <Link href="/">
          <a>
            <h1 className={styles.logo}>HESSED</h1>
          </a>
        </Link>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
