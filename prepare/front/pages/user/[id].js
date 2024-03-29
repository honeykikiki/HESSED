import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { useSelector } from 'react-redux';
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
        <title>{`YOUTHHILLTOP ${userPostNickname} 님의 게사글`}</title>
        <meta name="description" content={`${userPostNickname}님의 게시글`} />
        <meta property="og:title" content={`${userPostNickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${userPostNickname}님의 게시글`}
        />
        <meta
          property="og:image"
          content="/icon/youth_logo_line_black.png"
          layout="fill"
        />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>{`${userPostNickname}님의 게시글`}</div>
      </div>

      <div style={{ paddingTop: '44px' }} />
      <article className={style.a}>
        <section className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div className={style.profileImgOutBox}>
                {userPostprofileImg ? (
                  <img
                    src={`${baseURL}${userPostprofileImg}`}
                    alt="ProfiltImg"
                    className={style.userProfileImg}
                  />
                ) : (
                  <img
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
            <Link href="https://open.kakao.com/o/sJECgaRd">
              <a target="_blank">
                <div className={style.moerPostGet}>@YOUTHHILLTOP</div>
              </a>
            </Link>
          )}
        </section>
      </article>
      <div style={{ paddingBottom: '54px' }} />
    </MainLayout>
  );
};

export default Profile;
