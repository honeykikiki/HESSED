import React, { useCallback, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import MainLayout from '../../components/MainLayout';

import style from '../../styles/css/profile.module.css';
import styles from '../../styles/css/dynamicPost.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../../reducers/user';
import ProfileIcon from '../../components/profile/ProfileIcon';
import ProfilePost from '../../components/profile/ProfilePost';
import {
  MY_POST_GET_REQUEST,
  MY_POST_MORE_GET_REQUEST,
} from '../../reducers/post';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const {
    myPosts,
    myPostMoreGetLoading,
    myPostMoreGetFailed,
    myPostsLength,
    myPostPageNumber,
    myPostNickname,
    myPostMoreGetDone,
    myPostGetLoading,
    myPostprofileImg,
  } = useSelector((state) => state.post);

  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [changeNickname, onChangeNickname, setNickname] = useInput();

  const router = useRouter();
  const { id } = router.query;
  let actionControl = 0;

  useEffect(() => {
    // if (!me) {
    //   Router.push('/');
    // }
    if (changeNicknameDone) {
      setNickname('');
    }

    if (myPosts.length === 0 && !myPostGetLoading && id) {
      dispatch({
        type: MY_POST_GET_REQUEST,
        data: { mem_id: id },
      });
    }

    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (
          !myPostMoreGetLoading &&
          actionControl === 0 &&
          myPostMoreGetFailed
        ) {
          const formData = new FormData();
          formData.append('page', myPostPageNumber);
          formData.append('mem_id', id);
          dispatch({
            type: MY_POST_MORE_GET_REQUEST,
            data: formData,
          });
          actionControl = 0;
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    me,
    changeNickname,
    id,
    myPostPageNumber,
    myPostMoreGetFailed,
    myPostMoreGetLoading,
    actionControl,
    myPostGetLoading,
    myPosts,
  ]);

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
        <title>{`HESSED ${myPostNickname} 님의 게사글`}</title>
        <meta name="description" content={`${myPostNickname}님의 게시글`} />
        <meta property="og:title" content={`${myPostNickname}님의 게시글`} />
        <meta
          property="og:description"
          content={`${myPostNickname}님의 게시글`}
        />
        <meta property="og:image" content="/icon/HESSED_LOGO-W.png" />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" alt="BackIcon" />
        </div>
        <div>{`${myPostNickname}님의 게시글`}</div>
      </div>

      <div style={{ paddingTop: '44px' }}></div>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                {myPostprofileImg ? (
                  <img src={`${myPostprofileImg}`} alt="ProfiltImg" />
                ) : (
                  <img
                    src="/icon/profileBasic.svg"
                    className={style.profileBasic}
                    alt="ProfiltImg"
                  />
                )}
                {/* <img src="/icon/profle_img.png" alt="ProfileIcon" /> */}
              </div>
              <p>{myPostNickname}</p>
            </div>

            <div>
              <div>
                <div>
                  <p>{myPostsLength}</p>
                  게시글
                </div>
              </div>
              {/* <div className={style.profileNameReSet} onClick={profileSet}>
                프로필수정
              </div> */}
            </div>
          </div>

          {/* {!me?.id ? null : nicknameSet ? null : (
            <form className={style.changeNickname}>
              <input
                type="text"
                placeholder="변경할 닉네임을 입력해 주세요"
                value={changeNickname}
                onChange={onChangeNickname}
                required
              />
              <button onClick={clickChangeNickname}>바꾸기</button>
            </form>
          )} */}

          <div>
            <ProfileIcon
              onSave={onSave}
              onPost={onPost}
              postToSave={postToSave}
            />
            {postToSave ? (
              <ProfilePost myPosts={myPosts} />
            ) : (
              <ProfilePost myPost={savePost} />
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
