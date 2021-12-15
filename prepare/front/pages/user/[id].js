import React, { useCallback, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/MainLayout';

import style from '../../styles/css/profile.module.css';
import styles from '../../styles/css/dynamicPost.module.css';

import ProfilePost from '../../components/profile/ProfilePost';

import { baseURL } from '../../config/config';

const Profile = () => {
  const { me } = useSelector((state) => state.userInfo);
  const {
    userPostMoreGetDone,
    userPostsLength,
    userPostNickname,
    userPostprofileImg,
    userPosts,
  } = useSelector((state) => state.userPost);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // if (!me) {
    //   Router.push('/');
    // }
  }, [me, id]);

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>{`HESSED ${userPostNickname} 님의 게사글`}</title>
        <meta name="description" content={`${userPostNickname}님의 게시글`} />
        <meta property="og:title" content={`${userPostNickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${userPostNickname}님의 게시글`}
        />
        <meta property="og:image" content="/icon/HESSED_LOGO-W.png" />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      <div className={styles.head}>
        <div onClick={onClickBack}>
          <Image src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>{`${userPostNickname}님의 게시글`}</div>
      </div>

      <div style={{ paddingTop: '44px' }} />
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                {userPostprofileImg ? (
                  <Image
                    src={`${baseURL}${userPostprofileImg}`}
                    alt="ProfiltImg"
                  />
                ) : (
                  <Image
                    src="/icon/profileBasic.svg"
                    className={style.profileBasic}
                    alt="ProfiltImg"
                  />
                )}
              </div>
              <p>{userPostNickname}</p>
            </div>

            <div>
              <div>
                <div>
                  <p>{userPostsLength}</p>
                  게시글
                </div>
              </div>
            </div>
          </div>

          <div>
            <ProfilePost myPosts={userPosts} bool={false} userId={id} />
          </div>
          {userPostMoreGetDone ? null : (
            <div className={style.moerPostGet}>@HESSED</div>
          )}
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }} />
    </MainLayout>
  );
};

export default Profile;
