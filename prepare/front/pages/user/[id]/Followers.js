import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';

// import style from '../../../styles/css/profile.module.css';
import style from '../../../styles/css/dynamicFollowers.module.css';

const followers = () => {
  const router = useRouter();
  const { id } = router.query;

  const { me } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!me) {
  //     Router.push('/');
  //   }
  // }, []);

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  console.log(id);

  return (
    <div>
      <Head>
        <title>{`HESSED ${me?.nickname} 님의 게사글`}</title>
        <meta name="description" content={`${me?.nickname}님의 게시글`} />
        <meta property="og:title" content={`${me?.nickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${me?.nickname}님의 게시글`}
        />
        <meta property="og:image" content="/icon/HESSED_LOGO-W.png" />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      <div className={style.head}>
        <div onClick={onClickBack}>뒤로가기</div>
        <div>{`000 님의 팔로워`}</div>
      </div>

      <div>
        <div className={style.follow}>
          <h2>팔로워</h2>
          <ul>
            {me?.Followers.map((v, i) => {
              {
                console.log(v);
              }
              return (
                <li key={i}>
                  <div className={style.imageBox}>{<img src={v.image} />}</div>
                  <p>{v.nickname}</p>
                  <div className={style.cancle}>취소</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default followers;
