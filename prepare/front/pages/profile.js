import React, { useCallback, useEffect, useState, useRef } from 'react';
import Router from 'next/router';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  CHANGE_NICKNAME_REQUEST,
  CHANGE_PROFILEIMG_REQUEST,
} from '../reducers/user';
import {
  MY_POST_GET_REQUEST,
  MY_POST_MORE_GET_REQUEST,
} from '../reducers/post';
import ProfileIcon from '../components/profile/ProfileIcon';
import ProfilePost from '../components/profile/ProfilePost';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, changeNicknameDone } = useSelector((state) => state.user);
  const {
    mainPosts,
    myPosts,
    myPostsLength,
    myPostGetLoading,
    myPostpageMore,
    myPostMoreGetDone,
    myPostMoreGetLoading,
    myPostPageNumber,
    myPostMoreGetFailed,
  } = useSelector((state) => state.post);

  // 저장한 게시글만 가져오기
  const savePost = mainPosts.filter((v) => v.saved.id === me?.id);

  const [changeNickname, onChangeNickname, setNickname] = useInput();
  const [nicknameSet, setNicknameSet] = useState(true);
  const [postToSave, setpostToSave] = useState(true);
  const [photoToAddList, setPhotoToAddList] = useState(false);
  let pageActionControl = 0;

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

    if (myPosts.length === 0 && me && !myPostGetLoading) {
      const formData = new FormData();
      formData.append('mem_id', me.id);
      // dispatch({
      //   type: MY_POST_GET_REQUEST,
      //   data: formData,
      // });
      dispatch({
        type: MY_POST_GET_REQUEST,
        data: { mem_id: me.id },
      });
    }

    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (
          !myPostMoreGetLoading &&
          pageActionControl === 0 &&
          myPostMoreGetFailed
        ) {
          const formData = new FormData();
          formData.append('page', myPostPageNumber);
          formData.append('mem_id', me.id);
          dispatch({
            type: MY_POST_MORE_GET_REQUEST,
            data: formData,
          });
          pageActionControl = 1;
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
    nicknameSet,
    pageActionControl,
    myPostGetLoading,
    myPosts,
  ]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const handleImage = useCallback(
    (e) => {
      const temp = {};
      const photoToAdd = e.target.files;
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

  const profileSet = useCallback(
    (e) => {
      setNicknameSet((prev) => !prev);
    },
    [nicknameSet],
  );

  const clickChangeNickname = useCallback(
    (e) => {
      e.preventDefault();

      if (changeNickname) {
        dispatch({
          type: CHANGE_NICKNAME_REQUEST,
          data: {
            mem_id: me.id,
            mem_nickname: changeNickname,
          },
        });
      }
      const formData = new FormData();
      formData.append('mem_profileImg', photoToAddList);
      if (photoToAddList) {
        dispatch({
          type: CHANGE_PROFILEIMG_REQUEST,
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
              <ProfilePost myPosts={myPosts} />
            ) : (
              <ProfilePost myPost={savePost} />
            )}
            {myPostMoreGetDone ? null : (
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
