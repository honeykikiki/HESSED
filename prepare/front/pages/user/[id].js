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

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const router = useRouter();
  const { id } = router.query;

  const myPost = mainPosts.filter((v) => v.User.id === +id);

  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [changeNickname, onChangeNickname, setNickname] = useInput();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
    if (changeNicknameDone) {
      setNickname('');
    }
  }, [me, changeNickname]);

  const onPost = useCallback(() => {
    setpostToSave(true);
  }, [postToSave]);

  const onSave = useCallback(() => {
    setpostToSave(false);
  }, [postToSave]);

  const profileSet = useCallback((e) => {
    setNicknameSet((prev) => !prev);
  }, []);

  const clickChangeNickname = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: {
          userId: me.id,
          nickname: changeNickname,
        },
      });
    },
    [changeNickname],
  );

  const savedArray = [];
  const meSa = me?.Saved.forEach((v) => {
    savedArray.push(v.id);
  });
  const savePost = mainPosts.filter((v) => savedArray?.includes(v.id));

  const onClickBack = useCallback(() => {
    Router.back();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>{`HESSED ${myPost[0]?.User.nickname} 님의 게사글`}</title>
        <meta
          name="description"
          content={`${myPost[0]?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:title"
          content={`${myPost[0]?.User.nickname}님의 게시글`}
        />
        <meta
          property="og:description"
          content={`${myPost[0]?.User.nickname}님의 게시글`}
        />
        <meta property="og:image" content="/icon/HESSED_LOGO-W.png" />
        {/* <meta property="og:url" content={`https://nodebird.com/user/${id}`} /> */}
      </Head>

      <div style={{ marginTop: '44px' }}></div>
      <div className={styles.head}>
        <div onClick={onClickBack}>
          <img src="/icon/back.svg" width="12px" />
        </div>
        <div>{`${myPost[0]?.User.nickname}님의 게시글`}</div>
      </div>

      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                <img src="/icon/profle_img.png" />
              </div>
              <p>{myPost[0]?.User.nickname}</p>
            </div>

            <div>
              <div>
                <div>
                  게시글
                  <p>{myPost.length ?? 0}</p>
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
              <ProfilePost myPost={myPost} />
            ) : (
              <ProfilePost myPost={savePost} />
            )}
          </div>
        </article>
      </section>
    </MainLayout>
  );
};

export default Profile;
