import React, { useCallback, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import MainLayout from '../../components/MainLayout';

import style from '../../styles/css/profile.module.css';
import styles from '../../styles/css/dynamicPost.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';

import ProfileIcon from '../../components/profile/ProfileIcon';
import ProfilePost from '../../components/profile/ProfilePost';
import { MY_POST_GET_REQUEST } from '../../reducers/userPost';
import { baseURL } from '../../config/config';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.userInfo);
  const {
    myPosts,
    savePosts,
    userPostsLength,
    userPostNickname,
    userPostprofileImg,
    userPosts,
    userPostGetLoading,
  } = useSelector((state) => state.userPost);

  const [postToSave, setpostToSave] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // if (!me) {
    //   Router.push('/');
    // }
    if (changeNicknameDone) {
      setNickname('');
    }

    if (!userPostGetLoading && !myPostGetLoading && id) {
      dispatch({
        type: MY_POST_GET_REQUEST,
        data: { mem_id: id },
      });
    }
  }, [me, id, userPostGetLoading, myPostGetLoading]);

  const onPost = useCallback(() => {
    setpostToSave(true);
  }, [postToSave]);

  const onSave = useCallback(() => {
    setpostToSave(false);
  }, [postToSave]);

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
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>{`${userPostNickname}님의 게시글`}</div>
      </div>

      <div style={{ paddingTop: '44px' }}></div>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                {userPostprofileImg ? (
                  <img
                    src={`${baseURL}${userPostprofileImg}`}
                    alt="ProfiltImg"
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
            <ProfileIcon
              onSave={onSave}
              onPost={onPost}
              postToSave={postToSave}
            />
            {postToSave ? (
              <ProfilePost myPosts={userPosts} bool={false} />
            ) : (
              <ProfilePost myPosts={usersavePosts} bool={false} />
            )}
          </div>
          {myPostMoreGetDone ? null : (
            <div className={style.moerPostGet}>@HESSED</div>
          )}
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }}></div>
    </MainLayout>
  );
};

export default Profile;
