import React, { useCallback, useEffect, useState, useRef } from 'react';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { CHANGE_PROFILE_REQUEST } from '../reducers/userInfo';

import ProfileIcon from '../components/profile/ProfileIcon';
import ProfilePost from '../components/profile/ProfilePost';
import { MY_POST_AND_SAVE_POST_GET_REQUEST } from '../reducers/userPost';
import { baseURL } from '../config/config';
import ProfileSavePost from '../components/profile/ProfileSavePost';
import useinput from '../hooks/useinput';
import { imageUpdate } from '../hooks/imageUpdateFunc/imageUpdate';
import Loading from '../components/loading/loading';
import { PAGE_CHANGE } from '../reducers/postAdd';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeProfileSuccess } = useSelector((state) => state.userInfo);
  const {
    myPostNickname,
    myPosts,
    savePosts,
    myPostsLength,
    myPostMoreGetDone,
    userPostMoreGetDone,
  } = useSelector((state) => state.userPost);
  const { myPostGetLoading } = useSelector((state) => state.userPost);
  const { deleteCompleat } = useSelector((state) => state.postAdd);

  const [changeNickname, onChangeNickname, setNickname] = useinput();
  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [photoToAddList, setPhotoToAddList] = useState(false);
  const [imageLoading, setImageLoading] = useState();

  const imageInput = useRef();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }

    if (nicknameSet) {
      setPhotoToAddList();
      setNickname('');
    }
    if (changeProfileSuccess || deleteCompleat) {
      dispatch({
        type: MY_POST_AND_SAVE_POST_GET_REQUEST,
        data: { mem_id: me.id },
      });
    }
    if (deleteCompleat) {
      dispatch({
        type: PAGE_CHANGE,
      });
    }
  }, [me, nicknameSet, changeProfileSuccess, deleteCompleat]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const handleImage = useCallback(
    async (e) => {
      const temp = [];
      const photoToAdd = e.target.files;
      await imageUpdate(photoToAdd, temp, setImageLoading);
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
  const profileSet = useCallback(() => {
    setNicknameSet((prev) => !prev);
  }, [nicknameSet]);

  const clickChangeNickname = useCallback(
    (e) => {
      e.preventDefault();

      if (!changeNickname && !photoToAddList) {
        alert('바꿀 정보를 입력해주세요!');
        return;
      }

      const formData = new FormData();
      formData.append('mem_id', me.id);
      if (photoToAddList) {
        formData.append('mem_image', photoToAddList[0]?.file);
      }
      formData.append('mem_nickname', changeNickname || me.nickname);

      dispatch({
        type: CHANGE_PROFILE_REQUEST,
        data: formData,
      });

      setNicknameSet(true);
    },
    [changeNickname, photoToAddList, me],
  );

  return (
    <MainLayout>
      <div style={{ paddingTop: '44px' }} />
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div className={style.profileImgOutBox}>
                {nicknameSet ? (
                  me?.profileImg ? (
                    <img
                      src={`${baseURL}${me?.profileImg}`}
                      alt="ProfiltImg"
                      className={style.userProfileImg}
                    />
                  ) : (
                    <img
                      src="/icon/profileBasic.svg"
                      className={style.profileBasic}
                      alt="ProfiltImg"
                    />
                  )
                ) : photoToAddList ? (
                  <img
                    src={`${photoToAddList[0]?.url}`}
                    alt="ProfiltImg"
                    className={style.userProfileImg}
                  />
                ) : (
                  <img
                    src="/icon/addphoto.svg"
                    className={style.addImg}
                    onClick={onClickImageUpload}
                    alt="addPostIcon"
                  />
                )}
              </div>
              {imageLoading && <Loading />}
              <p className={style.nickname}>
                {myPostNickname ? me?.nickname : myPostNickname}
              </p>
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

            {myPostGetLoading ? (
              <div className={style.loading}>이미지 로딩중</div>
            ) : null}

            {postToSave ? (
              <ProfilePost myPosts={myPosts} bool />
            ) : (
              <ProfileSavePost myPosts={savePosts} bool />
            )}

            {myPostMoreGetDone || userPostMoreGetDone ? null : (
              <div className={style.moerPostGet}>@HESSED</div>
            )}
          </div>
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }} />
    </MainLayout>
  );
};

export default Profile;
