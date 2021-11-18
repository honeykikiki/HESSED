import React, { useCallback, useEffect, useState, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  CHANGE_NICKNAME_REQUEST,
  CHANGE_PROFILEIMG_REQUEST,
} from '../reducers/user';
import ProfileIcon from '../components/profile/ProfileIcon';
import ProfilePost from '../components/profile/ProfilePost';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const savedArray = [];
  me?.Saved.forEach((v) => {
    savedArray.push(v.id);
  });

  // 자기게시글만 가져오기
  const myPost = mainPosts.filter((v) => v.User.id === me?.id);
  // 저장한 게시글만 가져오기
  const savePost = mainPosts.filter((v) => savedArray?.includes(v.id));

  const [changeNickname, onChangeNickname, setNickname] = useInput();
  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [photoToAddList, setPhotoToAddList] = useState(false);

  const imageInput = useRef();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }

    if (nicknameSet) {
      setPhotoToAddList();
      setNickname('');
    }
  }, [me, changeNickname, nicknameSet]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const handleImage = useCallback(
    (e) => {
      const temp = {};
      const photoToAdd = e.target.files;
      // temp.id = photoToAdd[0].name;
      // temp.file = photoToAdd[0];
      temp.url = URL.createObjectURL(photoToAdd[0]);
      setPhotoToAddList(temp);
    },
    [photoToAddList],
  );

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

      if (changeNickname) {
        dispatch({
          type: CHANGE_NICKNAME_REQUEST,
          data: {
            userId: me.id,
            nickname: changeNickname,
            // mem_id : me.id
            // mem_nickname: me.nickname
          },
        });
      }
      if (photoToAddList) {
        dispatch({
          type: CHANGE_PROFILEIMG_REQUEST,
          data: photoToAddList,
        });
      }

      setNicknameSet(true);
    },
    [changeNickname, photoToAddList],
  );

  return (
    <MainLayout>
      <div style={{ paddingTop: '44px' }}></div>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                {nicknameSet ? (
                  me?.profileImg?.url ? (
                    <img src={`${me?.profileImg?.url}`} alt="ProfiltImg" />
                  ) : (
                    <img
                      src="/icon/profileBasic.svg"
                      className={style.profileBasic}
                      alt="ProfiltImg"
                    />
                  ) // 코드 바꾸기
                ) : photoToAddList?.url ? (
                  <img src={`${photoToAddList.url}`} alt="ProfiltImg" />
                ) : (
                  <img
                    src="/icon/addphoto.svg"
                    className={style.addImg}
                    onClick={onClickImageUpload}
                    alt="addPostIcon"
                  />
                )}
              </div>
              <p>{me?.nickname}</p>
            </div>

            <div>
              <div>
                <div>
                  게시글
                  <p>{myPost.length ?? 0}</p>
                </div>
              </div>
              <div className={style.profileNameReSet} onClick={profileSet}>
                프로필수정
              </div>
            </div>
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
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={imageInput}
                onChange={handleImage}
                hidden
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
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }}></div>
    </MainLayout>
  );
};

export default Profile;
