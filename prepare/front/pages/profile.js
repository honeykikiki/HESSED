import React, { useCallback, useEffect, useState, useRef } from 'react';
import Router from 'next/router';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  CHANGE_NICKNAME_REQUEST,
  CHANGE_PROFILE_REQUEST,
} from '../reducers/userInfo';

import ProfileIcon from '../components/profile/ProfileIcon';
import ProfilePost from '../components/profile/ProfilePost';
import { MY_POST_AND_SAVE_POST_GET_REQUEST } from '../reducers/userPost';
import { baseURL } from '../config/config';
import ProfileSavePost from '../components/profile/ProfileSavePost';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeProfileSuccess } = useSelector((state) => state.userInfo);
  const {
    myPostprofileImg,
    myPostNickname,
    myPosts,
    savePosts,
    myPostsLength,
    myPostMoreGetDone,
    userPostMoreGetDone,
  } = useSelector((state) => state.userPost);

  // 저장한 게시글만 가져오기
  // const savePost = mainPosts.filter((v) => v.saved.id === me?.id);

  const [changeNickname, onChangeNickname, setNickname] = useInput();
  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [photoToAddList, setPhotoToAddList] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const imageInput = useRef();

  useEffect(() => {
    if (!me) {
      Router.push('/');
      return;
    }

    if (nicknameSet) {
      setPhotoToAddList();
      setNickname('');
    }
    if (changeProfileSuccess) {
      dispatch({
        type: MY_POST_AND_SAVE_POST_GET_REQUEST,
        data: { mem_id: me.id },
      });
    }
  }, [me, nicknameSet, changeProfileSuccess]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const handleImage = useCallback(
    (e) => {
      const photoToAdd = e.target.files;
      setProfileImg(URL.createObjectURL(photoToAdd[0]));
      setPhotoToAddList(photoToAdd[0]);
    },
    [photoToAddList],
  );

  const onPost = useCallback(() => {
    setpostToSave(true);
  }, [postToSave]);

  const onSave = useCallback(() => {
    setpostToSave(false);
  }, [postToSave]);
  const profileSet = useCallback(
    (e) => {
      setNicknameSet((prev) => !prev);
      setProfileImg(null);
    },
    [nicknameSet],
  );

  const clickChangeNickname = useCallback(
    (e) => {
      e.preventDefault();

      if (!changeNickname && !photoToAddList) {
        return alert('닉네임 이미지가 있어야합니다.');
      }
      const formData = new FormData();
      formData.append('mem_id', me.id);
      formData.append('mem_image', photoToAddList);
      formData.append('mem_nickname', changeNickname);

      if (photoToAddList) {
        dispatch({
          type: CHANGE_PROFILE_REQUEST,
          data: formData,
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
                  me?.profileImg !== '' ? (
                    <img
                      src={`${baseURL}${myPostprofileImg}`}
                      alt="ProfiltImg"
                    />
                  ) : (
                    <img
                      src="/icon/profileBasic.svg"
                      className={style.profileBasic}
                      alt="ProfiltImg"
                    />
                  )
                ) : profileImg ? (
                  <img src={`${profileImg}`} alt="ProfiltImg" />
                ) : (
                  <img
                    src="/icon/addphoto.svg"
                    className={style.addImg}
                    onClick={onClickImageUpload}
                    alt="addPostIcon"
                  />
                )}
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
              <div className={style.profileNameReSet} onClick={profileSet}>
                {nicknameSet ? '프로필수정' : '나가기'}
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
              <ProfilePost myPosts={myPosts} bool={true} />
            ) : (
              <ProfileSavePost myPosts={savePosts} bool={true} />
            )}

            {myPostMoreGetDone || userPostMoreGetDone ? null : (
              <div className={style.moerPostGet}>@HESSED</div>
            )}
          </div>
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }}></div>
    </MainLayout>
  );
};

export default Profile;
