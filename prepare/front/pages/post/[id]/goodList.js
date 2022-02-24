import React, { useCallback, useEffect } from 'react';

import Router from 'next/router';

import { useSelector } from 'react-redux';
import MainLayout from '../../../components/MainLayout';
import GoodList from '../../../components/goodList/GoodList';
import style from '../../../styles/css/goodList.module.css';
import styles from '../../../styles/css/dynamicPost.module.css';

const goodList = () => {
  const { me } = useSelector((state) => state.userInfo);
  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);
  return (
    <MainLayout>
      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>좋아요</div>
      </div>
      <div style={{ paddingTop: '44px' }} />

      <article className={style.a}>
        <section className={style.maxWidth}>
          <GoodList />
        </section>
      </article>
    </MainLayout>
  );
};

export default goodList;
