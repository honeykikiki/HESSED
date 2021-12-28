import React, { useCallback } from 'react';

import Router from 'next/router';

import MainLayout from '../../components/MainLayout';
import GoodList from '../../components/goodList/GoodList';
import style from '../../styles/css/goodList.module.css';
import styles from '../../styles/css/dynamicPost.module.css';

const goodList = () => {
  const onClickBack = useCallback(() => {
    Router.back();
  }, []);
  return (
    <MainLayout>
      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>좋아요</div>
      </div>
      <div style={{ paddingTop: '44px' }} />

      <section className={style.a}>
        <article className={style.maxWidth}>
          <GoodList />
        </article>
      </section>
    </MainLayout>
  );
};

export default goodList;
