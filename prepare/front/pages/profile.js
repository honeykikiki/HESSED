import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import ProfileIcon from '../components/profile/ProfileIcon';
import ProfilePost from '../components/profile/ProfilePost';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const myPost = mainPosts.filter((v) => v.User.id === me?.id);

  const [followPage, setFollowPage] = useState(true);
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

  return (
    <MainLayout>
      <div style={{ paddingTop: '10px' }}></div>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                <img src="icon/profle_img.png" />
              </div>
              <p>{me?.nickname}</p>
            </div>

            <ul>
              <li>
                게시글
                <p>{myPost.length ?? 0}</p>
              </li>

              <li>
                <Link href={`/user/${me?.id}/followers`}>
                  <a>
                    팔로워
                    <p>{me?.Followers.length ?? 0}</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/user/${me?.id}/followings`}>
                  <a>
                    팔로잉
                    <p>{me?.Followings.length ?? 0}</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={style.profileNameReSet} onClick={profileSet}>
            프로필수정
          </div>
          {!me?.id ? null : nicknameSet ? null : (
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
          )}

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
          {/* 
            <div>
              <div className={style.follow}>
                <h2>팔로워</h2>
                <ul>
                  {me?.Followers.map((v, i) => {
                    return (
                      <li>
                        <div className={style.imageBox}>
                          {<img src={v.image} />}
                        </div>
                        <p>{v.nickname}</p>
                        <div className={style.cancle}>취소</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={style.follow}>
                <h2>팔로잉</h2>
                <ul>
                  {me?.Followings.map((v, i) => {
                    return (
                      <li>
                        <div className={style.imageBox}>
                          {<img src={v.image} />}
                        </div>
                        <p>{v.nickname}</p>
                        <div className={style.cancle}>팔로잉</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )} */}
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }}></div>
    </MainLayout>
  );
};

export default Profile;
