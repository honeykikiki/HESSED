import React, { useCallback } from 'react';
import Router from 'next/router';

import MainLayout from '../components/MainLayout';
import styles from '../styles/css/dynamicPost.module.css';
import style from '../styles/css/notice.module.css';
import NoticeContent from '../components/notice/NoticeContent';

const dummyContent = {
  title: '2021.01.05 09:36',
  image: '/event/event.jpeg',
  content:
    '안녕하세요!\n대학&청년부 여러분 날씨가 굉장히 쌀쌀해 지고 있습니다.\n 다들 감기 조심하시고 건강관리 유의하 시기 바람니다.\n이번주 토요일의 예배는 연합예배로 드려지게 되었습니다. 모두 다함께 드리는 만큼 더 기쁜 마음으로 오셔서 다같히 예배 드리면 좋을것 같습니다.\n \n "대학 청년부 연합예배 공지"\n 일시 : 2022.01.22 토 오후 18:00\n 장소 : 4층 청년부 예배실',
  write: '진',
  date: '22-01-20 13:47:43',
};

const Notice = () => {
  const onClickBack = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <MainLayout>
      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>공지사항</div>
      </div>
      <div style={{ paddingTop: '54px' }} />

      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.noticeWrap}>
            <p>새로운 공지</p>
            <div>
              <NoticeContent content={dummyContent} />
            </div>
            <p>지난 공지</p>
            <div>
              {Array(10)
                .fill()
                .map(() => {
                  return <NoticeContent content={dummyContent} />;
                })}
            </div>
          </div>
        </article>
      </section>
      <div style={{ paddingTop: '54px' }} />
    </MainLayout>
  );
};

export default Notice;
